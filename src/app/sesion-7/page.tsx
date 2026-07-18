"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Shield,
  Database,
  Users,
  Lock,
  Unlock,
  Settings,
  RefreshCw,
  Play,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle,
  AlertCircle,
  Terminal,
  FileText,
  Download,
  Layers,
  Activity,
  HardDrive,
  Wifi,
  Cpu,
  History,
  UserCheck,
  ChevronRight,
  Copy,
  Save,
  Check,
  FolderOpen,
  MonitorDot,
  Key,
  UserCog,
  ArchiveRestore,
  BookMarked
} from "lucide-react";

// Types definition
type Role = "Administrador" | "Supervisor" | "Usuario estándar";

interface DBUser {
  username: string;
  role: Role;
  status: "Activo" | "Inactivo";
  created_at: string;
}

interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  role: Role | "Sistema";
  operation: "LOGIN_SUCCESS" | "LOGIN_FAIL" | "INSERT" | "UPDATE" | "DELETE" | "ACCESS_DENIED" | "BACKUP" | "RESTORE" | "CREATE_USER";
  table: string;
  details: string;
  status: "Éxito" | "Denegado" | "Fallo";
}

interface Cliente {
  id: number;
  nombre: string;
  documento: string;
  ciudad: string;
  email: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  departamento: string;
  email: string;
}

interface Venta {
  id: number;
  cliente: string;
  total: number;
  fecha: string;
  estado: string;
}

interface DBBackup {
  id: string;
  timestamp: string;
  sizeKb: number;
  tablesCount: number;
  created_by: string;
  data: {
    clientes: Cliente[];
    productos: Producto[];
    empleados: Empleado[];
    ventas: Venta[];
  };
}

export default function Sesion7Page() {
  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<"seguridad" | "datos" | "respaldos" | "monitoreo" | "sql" | "rubrica">("seguridad");

  // --- Auth State ---
  const [currentUser, setCurrentUser] = useState<string>("admin");
  const [currentRole, setCurrentRole] = useState<Role>("Administrador");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginUser, setLoginUser] = useState<string>("");
  const [loginPass, setLoginPass] = useState<string>("");
  
  // Registration state
  const [newRegUser, setNewRegUser] = useState<string>("");
  const [newRegPass, setNewRegPass] = useState<string>("");
  const [newRegRole, setNewRegRole] = useState<Role>("Usuario estándar");

  // --- Mock DB Credentials ---
  const [usersDB, setUsersDB] = useState<Record<string, { pass: string; role: Role; status: "Activo" | "Inactivo"; created_at: string }>>({
    admin: { pass: "admin123", role: "Administrador", status: "Activo", created_at: "2026-07-01 08:00" },
    supervisor: { pass: "super123", role: "Supervisor", status: "Activo", created_at: "2026-07-05 10:15" },
    standard_user: { pass: "std123", role: "Usuario estándar", status: "Activo", created_at: "2026-07-10 14:30" }
  });

  // --- Mock Database Data Tables ---
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nombre: "Juan Pérez Ramos", documento: "10458796541", ciudad: "Trujillo", email: "juan.perez@mail.com" },
    { id: 2, nombre: "María Silva Mendoza", documento: "10789654123", ciudad: "Chiclayo", email: "maria.silva@mail.com" },
    { id: 3, nombre: "Carlos López Villanueva", documento: "20563214789", ciudad: "Lima", email: "carlos.lopez@mail.com" }
  ]);

  const [productos, setProductos] = useState<Producto[]>([
    { id: 1, nombre: "Laptop Core i7 Gen13", precio: 3200, stock: 15, categoria: "Tecnología" },
    { id: 2, nombre: "Mouse Inalámbrico RGB", precio: 45, stock: 100, categoria: "Accesorios" },
    { id: 3, nombre: "Monitor 24\" IPS 144Hz", precio: 650, stock: 20, categoria: "Tecnología" }
  ]);

  const [empleados, setEmpleados] = useState<Empleado[]>([
    { id: 1, nombre: "Alex Salvatierra", puesto: "Administrador BD", departamento: "TI", email: "alex.salvatierra@uprit.edu.pe" },
    { id: 2, nombre: "Mgtr. Susana Caballero", puesto: "Coordinador Académico", departamento: "Educación", email: "s.caballero@uprit.edu.pe" },
    { id: 3, nombre: "Dante Chavesta", puesto: "Supervisor de Sistemas", departamento: "TI", email: "dante.chavesta@uprit.edu.pe" }
  ]);

  const [ventas, setVentas] = useState<Venta[]>([
    { id: 1, cliente: "Juan Pérez Ramos", total: 3200, fecha: "2026-07-18 10:30", estado: "Completada" },
    { id: 2, cliente: "María Silva Mendoza", total: 90, fecha: "2026-07-18 11:15", estado: "Completada" },
    { id: 3, cliente: "Carlos López Villanueva", total: 650, fecha: "2026-07-18 14:00", estado: "Procesando" }
  ]);

  // --- CRUD active table selection ---
  const [activeDBTable, setActiveDBTable] = useState<"clientes" | "productos" | "empleados" | "ventas">("clientes");

  // --- CRUD Forms States ---
  const [clienteForm, setClienteForm] = useState<Omit<Cliente, "id">>({ nombre: "", documento: "", ciudad: "", email: "" });
  const [productoForm, setProductoForm] = useState<Omit<Producto, "id">>({ nombre: "", precio: 0, stock: 0, categoria: "Tecnología" });
  const [empleadoForm, setEmpleadoForm] = useState<Omit<Empleado, "id">>({ nombre: "", puesto: "", departamento: "", email: "" });
  const [ventaForm, setVentaForm] = useState<Omit<Venta, "id">>({ cliente: "", total: 0, fecha: "", estado: "Completada" });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNewRow, setIsAddingNewRow] = useState<boolean>(false);

  // Search filter
  const [dbSearchQuery, setDbSearchQuery] = useState<string>("");

  // --- Backup & Restore State ---
  const [backupsList, setBackupsList] = useState<DBBackup[]>([
    {
      id: "BK-20260710-1200",
      timestamp: "2026-07-10 12:00:35",
      sizeKb: 45.2,
      tablesCount: 4,
      created_by: "system",
      data: {
        clientes: [
          { id: 1, nombre: "Juan Pérez Ramos", documento: "10458796541", ciudad: "Trujillo", email: "juan.perez@mail.com" },
          { id: 2, nombre: "María Silva Mendoza", documento: "10789654123", ciudad: "Chiclayo", email: "maria.silva@mail.com" }
        ],
        productos: [
          { id: 1, nombre: "Laptop Core i7 Gen13", precio: 3200, stock: 15, categoria: "Tecnología" },
          { id: 2, nombre: "Mouse Inalámbrico RGB", precio: 45, stock: 100, categoria: "Accesorios" }
        ],
        empleados: [
          { id: 1, nombre: "Alex Salvatierra", puesto: "Administrador BD", departamento: "TI", email: "alex.salvatierra@uprit.edu.pe" }
        ],
        ventas: [
          { id: 1, cliente: "Juan Pérez Ramos", total: 3200, fecha: "2026-07-10 10:30", estado: "Completada" }
        ]
      }
    }
  ]);

  // --- Monitoreo State ---
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: "2026-07-18 08:00:05", user: "system", role: "Sistema", operation: "LOGIN_SUCCESS", table: "Conexiones", details: "Inicio de servicio de monitoreo en BD Corporativa", status: "Éxito" },
    { id: 2, timestamp: "2026-07-18 09:30:15", user: "admin", role: "Administrador", operation: "LOGIN_SUCCESS", table: "Conexiones", details: "Autenticación exitosa IP 192.168.1.15", status: "Éxito" },
    { id: 3, timestamp: "2026-07-18 10:14:22", user: "supervisor", role: "Supervisor", operation: "LOGIN_SUCCESS", table: "Conexiones", details: "Autenticación exitosa IP 192.168.1.24", status: "Éxito" },
    { id: 4, timestamp: "2026-07-18 10:20:45", user: "supervisor", role: "Supervisor", operation: "UPDATE", table: "productos", details: "Actualizó stock del Producto ID 2 (100 unidades)", status: "Éxito" },
  ]);

  // Active simulated sessions
  const [activeConnections, setActiveConnections] = useState([
    { id: 1, user: "admin", ip: "192.168.1.15", client: "DBeaver Client 24.1", connectedAt: "09:30", role: "Administrador" },
    { id: 2, user: "supervisor", ip: "192.168.1.24", client: "Web console", connectedAt: "10:14", role: "Supervisor" },
    { id: 3, user: "system_job", ip: "127.0.0.1", client: "Internal Backup Scheduler", connectedAt: "00:00", role: "Administrador" }
  ]);

  // Performance state variables
  const [performanceCpu, setPerformanceCpu] = useState(12);
  const [performanceQps, setPerformanceQps] = useState(15);
  const [dbSize, setDbSize] = useState(148.5); // KB

  // Toast message notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);
  
  // Clipboard copied indicator
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Rubric checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, category: "Seguridad", text: "Crear usuarios con distintos niveles de acceso (Admin, Supervisor, Estándar)", completed: true },
    { id: 2, category: "Seguridad", text: "Asignar permisos específicos por rol (DDL y DCL)", completed: true },
    { id: 3, category: "Seguridad", text: "Validar el acceso mediante usuario y contraseña", completed: true },
    { id: 4, category: "Seguridad", text: "Registrar intentos de acceso exitosos y fallidos (Auditoría)", completed: true },
    { id: 5, category: "Administración", text: "Registrar información en tablas (Clientes, Productos, Empleados, Ventas)", completed: true },
    { id: 6, category: "Administración", text: "Permitir modificar y eliminar registros controlando privilegios", completed: true },
    { id: 7, category: "Administración", text: "Realizar consultas de información mediante búsquedas y filtros", completed: true },
    { id: 8, category: "Respaldo", text: "Generar copias de seguridad de la base de datos con fecha y hora", completed: true },
    { id: 9, category: "Respaldo", text: "Restaurar información desde un respaldo seleccionado", completed: true },
    { id: 10, category: "Respaldo", text: "Mantener un historial detallado de respaldos realizados", completed: true },
    { id: 11, category: "Monitoreo", text: "Registro de actividades y operaciones de usuarios en bitácora", completed: true },
    { id: 12, category: "Monitoreo", text: "Monitoreo en tiempo real de conexiones activas", completed: true },
    { id: 13, category: "Monitoreo", text: "Generación de reportes de operaciones y métricas de rendimiento", completed: true },
    { id: 14, category: "Técnico", text: "Implementar scripts SQL para creación de tablas, usuarios y privilegios", completed: true }
  ]);

  // Trigger Toast Notification utility
  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add Log Entry utility
  const addLog = (
    operation: LogEntry["operation"],
    table: string,
    details: string,
    status: LogEntry["status"],
    userOverride?: string,
    roleOverride?: Role
  ) => {
    const newLog: LogEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      user: userOverride || (isLoggedIn ? currentUser : "Invitado"),
      role: roleOverride || (isLoggedIn ? currentRole : "Usuario estándar"),
      operation,
      table,
      details,
      status
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  // Simulated Performance metrics fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setPerformanceCpu(Math.floor(Math.random() * (28 - 8) + 8));
      setPerformanceQps(Math.floor(Math.random() * (22 - 10) + 10));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // --- Auth Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUser.trim() || !loginPass.trim()) {
      showToast("Por favor complete todos los campos", "warning");
      return;
    }

    const matchedUser = usersDB[loginUser.toLowerCase()];

    if (matchedUser && matchedUser.pass === loginPass) {
      if (matchedUser.status === "Inactivo") {
        showToast("El usuario se encuentra inhabilitado", "error");
        addLog("LOGIN_FAIL", "Conexiones", `Intento de login con cuenta inactiva: ${loginUser}`, "Fallo", loginUser, matchedUser.role);
        return;
      }

      setCurrentUser(loginUser.toLowerCase());
      setCurrentRole(matchedUser.role);
      setIsLoggedIn(true);
      setLoginPass("");
      showToast(`Acceso concedido como ${matchedUser.role}`, "success");
      addLog("LOGIN_SUCCESS", "Conexiones", `Inicio de sesión exitoso desde consola web`, "Éxito", loginUser.toLowerCase(), matchedUser.role);

      // Add to active connections if not present
      setActiveConnections((prev) => {
        if (prev.some((c) => c.user === loginUser.toLowerCase())) return prev;
        return [
          {
            id: Date.now(),
            user: loginUser.toLowerCase(),
            ip: "192.168.1." + Math.floor(Math.random() * 254 + 2),
            client: "Web console",
            connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            role: matchedUser.role
          },
          ...prev
        ];
      });
    } else {
      showToast("Usuario o contraseña incorrectos", "error");
      addLog(
        "LOGIN_FAIL",
        "Conexiones",
        `Intento fallido de login con usuario: ${loginUser}`,
        "Fallo",
        loginUser,
        "Usuario estándar"
      );
    }
  };

  const handleLogout = () => {
    const userExiting = currentUser;
    const roleExiting = currentRole;
    setIsLoggedIn(false);
    setCurrentUser("");
    setCurrentRole("Usuario estándar");
    setLoginUser("");
    showToast("Sesión cerrada correctamente", "info");
    addLog("LOGIN_FAIL", "Conexiones", `Sesión cerrada voluntariamente`, "Éxito", userExiting, roleExiting);

    // Remove from active connections
    setActiveConnections((prev) => prev.filter((c) => c.user !== userExiting));
  };

  // Quick login helper for review convenience
  const handleQuickLogin = (user: string, pass: string) => {
    setLoginUser(user);
    setLoginPass(pass);
    setTimeout(() => {
      // Simulate click
      const matchedUser = usersDB[user];
      if (matchedUser) {
        setCurrentUser(user);
        setCurrentRole(matchedUser.role);
        setIsLoggedIn(true);
        setLoginPass("");
        showToast(`Acceso rápido: Rol ${matchedUser.role}`, "success");
        addLog("LOGIN_SUCCESS", "Conexiones", `Inicio de sesión rápido desde accesos sugeridos`, "Éxito", user, matchedUser.role);

        setActiveConnections((prev) => {
          if (prev.some((c) => c.user === user)) return prev;
          return [
            {
              id: Date.now(),
              user,
              ip: "192.168.1." + Math.floor(Math.random() * 254 + 2),
              client: "Web console",
              connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              role: matchedUser.role
            },
            ...prev
          ];
        });
      }
    }, 100);
  };

  // Register New User Handler (Admin only)
  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn || currentRole !== "Administrador") {
      showToast("Acceso Denegado: Solo el Administrador puede gestionar usuarios", "error");
      addLog("ACCESS_DENIED", "usuarios", "Intento de registro de usuario sin permisos de Admin", "Denegado");
      return;
    }

    if (!newRegUser.trim() || !newRegPass.trim()) {
      showToast("Por favor llene todos los campos de registro", "warning");
      return;
    }

    const regUserLower = newRegUser.trim().toLowerCase();

    if (usersDB[regUserLower]) {
      showToast("El usuario ya existe en la base de datos", "warning");
      return;
    }

    setUsersDB((prev) => ({
      ...prev,
      [regUserLower]: {
        pass: newRegPass,
        role: newRegRole,
        status: "Activo",
        created_at: new Date().toISOString().replace("T", " ").substring(0, 16)
      }
    }));

    showToast(`Usuario '${regUserLower}' registrado exitosamente`, "success");
    addLog("CREATE_USER", "usuarios", `Creó nuevo usuario '${regUserLower}' con rol: ${newRegRole}`, "Éxito");
    setNewRegUser("");
    setNewRegPass("");
    setNewRegRole("Usuario estándar");
    setDbSize((prev) => parseFloat((prev + 0.8).toFixed(1)));
  };

  const handleToggleUserStatus = (username: string) => {
    if (!isLoggedIn || currentRole !== "Administrador") {
      showToast("Acceso Denegado: Solo el Administrador puede inhabilitar cuentas", "error");
      addLog("ACCESS_DENIED", "usuarios", `Intento de modificar estado de usuario: ${username}`, "Denegado");
      return;
    }

    if (username === currentUser) {
      showToast("No puedes inhabilitar tu propio usuario activo", "warning");
      return;
    }

    setUsersDB((prev) => {
      const currentStatus = prev[username].status;
      const newStatus = currentStatus === "Activo" ? "Inactivo" : "Activo";
      
      showToast(`Usuario '${username}' está ahora ${newStatus}`, "info");
      addLog("UPDATE", "usuarios", `Modificó estado de '${username}' a ${newStatus}`, "Éxito");
      
      // If inactivated, disconnect
      if (newStatus === "Inactivo") {
        setActiveConnections((prevConn) => prevConn.filter((c) => c.user !== username));
      }

      return {
        ...prev,
        [username]: {
          ...prev[username],
          status: newStatus
        }
      };
    });
  };

  // --- CRUD Operation Handlers & Access Control ---

  // Check role authorization helper
  const checkPermission = (action: "INSERT" | "UPDATE" | "DELETE", tableName: string): boolean => {
    if (!isLoggedIn) {
      showToast("Inicie sesión para realizar operaciones", "error");
      return false;
    }

    // Role-based Access Control logic
    if (currentRole === "Administrador") {
      return true; // Admin has ALL rights
    }

    if (currentRole === "Supervisor") {
      if (action === "DELETE") {
        showToast(`Acceso Denegado: Rol ${currentRole} no tiene privilegios DELETE`, "error");
        addLog("ACCESS_DENIED", tableName, `Intento denegado de DELETE en tabla: ${tableName}`, "Denegado");
        return false;
      }
      return true; // Read, Insert, Update ok
    }

    if (currentRole === "Usuario estándar") {
      if (action === "UPDATE" || action === "DELETE") {
        showToast(`Acceso Denegado: Rol ${currentRole} no posee privilegios de escritura ${action}`, "error");
        addLog("ACCESS_DENIED", tableName, `Intento denegado de ${action} en tabla: ${tableName}`, "Denegado");
        return false;
      }
      return true; // Read (SELECT), and Insert is allowed
    }

    return false;
  };

  // Add / Edit Record Submission Handler
  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();

    const isEditing = editingId !== null;
    const actionType = isEditing ? "UPDATE" : "INSERT";

    if (!checkPermission(actionType, activeDBTable)) return;

    if (activeDBTable === "clientes") {
      if (!clienteForm.nombre.trim() || !clienteForm.documento.trim()) {
        showToast("Complete los campos obligatorios", "warning");
        return;
      }
      if (isEditing) {
        setClientes((prev) =>
          prev.map((c) => (c.id === editingId ? { ...c, ...clienteForm } : c))
        );
        showToast("Cliente actualizado", "success");
        addLog("UPDATE", "clientes", `Modificó cliente ID ${editingId}`, "Éxito");
      } else {
        const newId = clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;
        setClientes((prev) => [...prev, { id: newId, ...clienteForm }]);
        showToast("Cliente registrado con éxito", "success");
        addLog("INSERT", "clientes", `Registró nuevo cliente ID ${newId} (${clienteForm.nombre})`, "Éxito");
      }
      setClienteForm({ nombre: "", documento: "", ciudad: "", email: "" });
    } 
    
    else if (activeDBTable === "productos") {
      if (!productoForm.nombre.trim() || productoForm.precio <= 0) {
        showToast("Datos de producto inválidos", "warning");
        return;
      }
      if (isEditing) {
        setProductos((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...productoForm } : p))
        );
        showToast("Producto actualizado", "success");
        addLog("UPDATE", "productos", `Modificó producto ID ${editingId}`, "Éxito");
      } else {
        const newId = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
        setProductos((prev) => [...prev, { id: newId, ...productoForm }]);
        showToast("Producto insertado con éxito", "success");
        addLog("INSERT", "productos", `Insertó nuevo producto ID ${newId} (${productoForm.nombre})`, "Éxito");
      }
      setProductoForm({ nombre: "", precio: 0, stock: 0, categoria: "Tecnología" });
    } 
    
    else if (activeDBTable === "empleados") {
      if (!empleadoForm.nombre.trim() || !empleadoForm.puesto.trim()) {
        showToast("Complete los campos de empleado", "warning");
        return;
      }
      if (isEditing) {
        setEmpleados((prev) =>
          prev.map((emp) => (emp.id === editingId ? { ...emp, ...empleadoForm } : emp))
        );
        showToast("Empleado modificado", "success");
        addLog("UPDATE", "empleados", `Modificó empleado ID ${editingId}`, "Éxito");
      } else {
        const newId = empleados.length > 0 ? Math.max(...empleados.map((emp) => emp.id)) + 1 : 1;
        setEmpleados((prev) => [...prev, { id: newId, ...empleadoForm }]);
        showToast("Empleado registrado exitosamente", "success");
        addLog("INSERT", "empleados", `Registró empleado ID ${newId} (${empleadoForm.nombre})`, "Éxito");
      }
      setEmpleadoForm({ nombre: "", puesto: "", departamento: "", email: "" });
    } 
    
    else if (activeDBTable === "ventas") {
      if (!ventaForm.cliente.trim() || ventaForm.total <= 0) {
        showToast("Datos de venta inválidos", "warning");
        return;
      }
      const fechaActual = new Date().toISOString().replace("T", " ").substring(0, 16);
      if (isEditing) {
        setVentas((prev) =>
          prev.map((v) => (v.id === editingId ? { ...v, ...ventaForm } : v))
        );
        showToast("Venta modificada", "success");
        addLog("UPDATE", "ventas", `Modificó venta ID ${editingId}`, "Éxito");
      } else {
        const newId = ventas.length > 0 ? Math.max(...ventas.map((v) => v.id)) + 1 : 1;
        setVentas((prev) => [...prev, { id: newId, ...ventaForm, fecha: fechaActual }]);
        showToast("Venta agregada con éxito", "success");
        addLog("INSERT", "ventas", `Creó venta ID ${newId} para '${ventaForm.cliente}'`, "Éxito");
      }
      setVentaForm({ cliente: "", total: 0, fecha: "", estado: "Completada" });
    }

    setEditingId(null);
    setIsAddingNewRow(false);
    setDbSize((prev) => parseFloat((prev + 1.2).toFixed(1)));
  };

  // Edit action initializer
  const handleEditClick = (record: any) => {
    if (!checkPermission("UPDATE", activeDBTable)) return;

    setEditingId(record.id);
    setIsAddingNewRow(true); // Open form panel

    if (activeDBTable === "clientes") {
      setClienteForm({ nombre: record.nombre, documento: record.documento, ciudad: record.ciudad, email: record.email });
    } else if (activeDBTable === "productos") {
      setProductoForm({ nombre: record.nombre, precio: record.precio, stock: record.stock, categoria: record.categoria });
    } else if (activeDBTable === "empleados") {
      setEmpleadoForm({ nombre: record.nombre, puesto: record.puesto, departamento: record.departamento, email: record.email });
    } else if (activeDBTable === "ventas") {
      setVentaForm({ cliente: record.cliente, total: record.total, fecha: record.fecha, estado: record.estado });
    }
  };

  // Delete Action Handler
  const handleDeleteRecord = (id: number) => {
    if (!checkPermission("DELETE", activeDBTable)) return;

    if (activeDBTable === "clientes") {
      setClientes((prev) => prev.filter((c) => c.id !== id));
      showToast(`Cliente ID ${id} eliminado`, "success");
      addLog("DELETE", "clientes", `Eliminó cliente ID ${id}`, "Éxito");
    } else if (activeDBTable === "productos") {
      setProductos((prev) => prev.filter((p) => p.id !== id));
      showToast(`Producto ID ${id} eliminado`, "success");
      addLog("DELETE", "productos", `Eliminó producto ID ${id}`, "Éxito");
    } else if (activeDBTable === "empleados") {
      setEmpleados((prev) => prev.filter((emp) => emp.id !== id));
      showToast(`Empleado ID ${id} eliminado`, "success");
      addLog("DELETE", "empleados", `Eliminó empleado ID ${id}`, "Éxito");
    } else if (activeDBTable === "ventas") {
      setVentas((prev) => prev.filter((v) => v.id !== id));
      showToast(`Venta ID ${id} eliminada`, "success");
      addLog("DELETE", "ventas", `Eliminó venta ID ${id}`, "Éxito");
    }

    setDbSize((prev) => parseFloat(Math.max(10, prev - 1.0).toFixed(1)));
  };

  // Reset/Cancel Form
  const handleCancelForm = () => {
    setIsAddingNewRow(false);
    setEditingId(null);
    setClienteForm({ nombre: "", documento: "", ciudad: "", email: "" });
    setProductoForm({ nombre: "", precio: 0, stock: 0, categoria: "Tecnología" });
    setEmpleadoForm({ nombre: "", puesto: "", departamento: "", email: "" });
    setVentaForm({ cliente: "", total: 0, fecha: "", estado: "Completada" });
  };

  // Search Filter Selector
  const filteredData = useMemo(() => {
    const query = dbSearchQuery.toLowerCase().trim();
    if (!query) {
      if (activeDBTable === "clientes") return clientes;
      if (activeDBTable === "productos") return productos;
      if (activeDBTable === "empleados") return empleados;
      return ventas;
    }

    if (activeDBTable === "clientes") {
      return clientes.filter(c => c.nombre.toLowerCase().includes(query) || c.documento.includes(query) || c.ciudad.toLowerCase().includes(query));
    }
    if (activeDBTable === "productos") {
      return productos.filter(p => p.nombre.toLowerCase().includes(query) || p.categoria.toLowerCase().includes(query));
    }
    if (activeDBTable === "empleados") {
      return empleados.filter(e => e.nombre.toLowerCase().includes(query) || e.puesto.toLowerCase().includes(query) || e.departamento.toLowerCase().includes(query));
    }
    return ventas.filter(v => v.cliente.toLowerCase().includes(query) || v.estado.toLowerCase().includes(query));
  }, [activeDBTable, dbSearchQuery, clientes, productos, empleados, ventas]);


  // --- Backup & Restore Handlers ---
  const handleCreateBackup = () => {
    if (!isLoggedIn) {
      showToast("Debe iniciar sesión para realizar copias de seguridad", "error");
      return;
    }

    const timestampStr = new Date().toISOString().replace("T", " ").substring(0, 19);
    const dateFormatted = new Date().toISOString().replace(/[-:T]/g, "").substring(0, 14);
    const backupId = `BK-${dateFormatted}`;
    
    // Size estimation based on records
    const sizeEst = parseFloat(((clientes.length + productos.length + empleados.length + ventas.length) * 0.45 + 10).toFixed(2));

    const newBackup: DBBackup = {
      id: backupId,
      timestamp: timestampStr,
      sizeKb: sizeEst,
      tablesCount: 4,
      created_by: currentUser,
      data: {
        clientes: JSON.parse(JSON.stringify(clientes)),
        productos: JSON.parse(JSON.stringify(productos)),
        empleados: JSON.parse(JSON.stringify(empleados)),
        ventas: JSON.parse(JSON.stringify(ventas))
      }
    };

    setBackupsList((prev) => [newBackup, ...prev]);
    showToast(`Copia de seguridad ${backupId} generada exitosamente`, "success");
    addLog("BACKUP", "Copias de Seguridad", `Generó copia de seguridad '${backupId}'`, "Éxito");
  };

  const handleRestoreBackup = (backup: DBBackup) => {
    if (!isLoggedIn) {
      showToast("Debe iniciar sesión para restaurar información", "error");
      return;
    }

    if (currentRole !== "Administrador" && currentRole !== "Supervisor") {
      showToast("Acceso Denegado: Se requiere rol Administrador o Supervisor para restaurar", "error");
      addLog("ACCESS_DENIED", "Respaldos", `Intento de restauración por usuario ${currentUser} (rol ${currentRole})`, "Denegado");
      return;
    }

    // Restore tables
    setClientes(JSON.parse(JSON.stringify(backup.data.clientes)));
    setProductos(JSON.parse(JSON.stringify(backup.data.productos)));
    setEmpleados(JSON.parse(JSON.stringify(backup.data.empleados)));
    setVentas(JSON.parse(JSON.stringify(backup.data.ventas)));

    showToast(`Base de datos restaurada al punto: ${backup.id}`, "success");
    addLog("RESTORE", "Tablas Generales", `Restauró base de datos desde copia '${backup.id}'`, "Éxito");
    setDbSize(parseFloat((backup.sizeKb * 1.5).toFixed(1)));
  };

  // --- SQL Scripts Code Block Generator ---
  const sqlScriptContent = `-- =========================================================
-- ACTIVIDAD FORMATIVA Nº7: SEGURIDAD Y ADMINISTRACIÓN DE BD
-- Universidad Privada de Trujillo (UPRIT) - Grupo 5
-- Asignatura: BASE DE DATOS
-- =========================================================

-- 1. CREACIÓN DE LA BASE DE DATOS CORPORATIVA
CREATE DATABASE corporativo_db;
\\c corporativo_db; -- Conectar a la base de datos (PostgreSQL)

-- 2. CREACIÓN DE LAS ENTIDADES PRINCIPALES
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    ciudad VARCHAR(50),
    email VARCHAR(100),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    categoria VARCHAR(50),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    puesto VARCHAR(50) NOT NULL,
    departamento VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    cliente_nombre VARCHAR(100) NOT NULL,
    total DECIMAL(12,2) NOT NULL CHECK (total >= 0),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'Procesada'
);

-- 3. CREACIÓN DE LA TABLA DE AUDITORÍA Y BITÁCORA
CREATE TABLE bitacora_actividades (
    id SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_db VARCHAR(50) NOT NULL,
    operacion VARCHAR(20) NOT NULL, -- INSERT, UPDATE, DELETE, LOGIN_FAIL
    tabla_afectada VARCHAR(50),
    detalles TEXT,
    estado VARCHAR(20) -- ÉXITO, DENEGADO
);

-- 4. CONTROL DE ACCESOS Y ROLES (DCL)
-- Creación de roles de seguridad
CREATE ROLE administrador;
CREATE ROLE supervisor;
CREATE ROLE usuario_estandar;

-- Asignación de permisos sobre las tablas
-- ADMINISTRADOR: Control total de la base de datos corporativa
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO administrador;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO administrador;

-- SUPERVISOR: Puede leer, insertar y actualizar, pero no eliminar (No DELETE)
GRANT SELECT, INSERT, UPDATE ON clientes, productos, empleados, ventas TO supervisor;
GRANT SELECT, INSERT, UPDATE ON bitacora_actividades TO supervisor;

-- USUARIO ESTÁNDAR: Solo consultas (SELECT) e inserción básica en tablas
GRANT SELECT, INSERT ON clientes, productos, ventas TO usuario_estandar;
GRANT SELECT ON empleados TO usuario_estandar;

-- 5. CREACIÓN DE USUARIOS ASOCIADOS A LOS ROLES
-- Usuario Administrador
CREATE USER admin_corp WITH PASSWORD 'admin123';
GRANT administrador TO admin_corp;

-- Usuario Supervisor
CREATE USER supervisor_corp WITH PASSWORD 'super123';
GRANT supervisor TO supervisor_corp;

-- Usuario Estándar
CREATE USER std_corp WITH PASSWORD 'std123';
GRANT usuario_estandar TO std_corp;

-- 6. TRIGGER PARA REGISTRO DE MONITOREO AUTOMÁTICO (PostgreSQL)
CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO bitacora_actividades (usuario_db, operacion, tabla_afectada, detalles, estado)
    VALUES (CURRENT_USER, TG_OP, TG_TABLE_NAME, 'Registro afectado ID: ' || COALESCE(NEW.id, OLD.id), 'ÉXITO');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auditoria_clientes
AFTER INSERT OR UPDATE OR DELETE ON clientes
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER trg_auditoria_productos
AFTER INSERT OR UPDATE OR DELETE ON productos
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();
`;

  // Download SQL Script helper
  const handleDownloadSQL = () => {
    const element = document.createElement("a");
    const file = new Blob([sqlScriptContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "seguridad_y_administracion_uprit.sql";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Script SQL descargado correctamente", "success");
    addLog("BACKUP", "Scripts SQL", "Descargó script de inicialización SQL", "Éxito");
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlScriptContent);
    setIsCopied(true);
    showToast("Script SQL copiado al portapapeles", "success");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Toast Alert Component */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl max-w-sm transition-all animate-bounce ${
          toast.type === "success" ? "bg-[#EFF8F4] border-[#A7F3D0] text-[#1E3A1E]" :
          toast.type === "error" ? "bg-[#FFF5F5] border-[#FCA5A5] text-[#7A1A1A]" :
          toast.type === "warning" ? "bg-[#FFFDF5] border-[#FDE047] text-[#713F12]" :
          "bg-[#F0F4FF] border-[#BFDBFE] text-[#1E3A8A]"
        }`}>
          {toast.type === "success" && <CheckCircle className="h-5 w-5 text-[#2D9B6F] shrink-0" />}
          {toast.type === "error" && <AlertCircle className="h-5 w-5 text-[#DC2626] shrink-0" />}
          {toast.type === "warning" && <AlertCircle className="h-5 w-5 text-[#E8A020] shrink-0" />}
          {toast.type === "info" && <CheckCircle className="h-5 w-5 text-[#3730A3] shrink-0" />}
          <p className="text-xs font-bold leading-normal">{toast.message}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        
        {/* HEADER SECTION */}
        <div className="mb-8 pb-6 border-b border-[#1E2A5E]/10">
          <nav className="text-xs text-[#6B7280] font-semibold mb-2 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#1E2A5E] transition-colors">Inicio</Link> / Sesión 7
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE047] px-2.5 py-0.5 text-xs font-bold text-[#D97706] mb-2 uppercase">
                Administración & Seguridad de BD
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#1E2A5E]">
                Sesión 7: Consola Corporativa y Monitoreo
              </h1>
              <p className="text-sm text-[#6B7280] mt-1 leading-relaxed max-w-3xl">
                Simulador del sistema de gestión corporativo con control de privilegios (DAC/RBAC), respaldos automáticos y bitácora de auditoría SQL.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-2 bg-[#EFF8F4] border border-[#A7F3D0] px-3.5 py-2 rounded-xl">
                  <UserCheck className="h-4.5 w-4.5 text-[#2D9B6F]" />
                  <div className="text-left">
                    <span className="text-[10px] text-[#6B7280] block font-bold uppercase leading-none">Usuario Activo</span>
                    <span className="text-xs font-extrabold text-[#1E2A5E]">{currentUser} ({currentRole})</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="ml-2 hover:bg-red-50 p-1.5 rounded-lg text-[#DC2626] transition-colors cursor-pointer"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-[#FFF5F5] border border-[#FCA5A5] px-3.5 py-2 rounded-xl">
                  <Lock className="h-4.5 w-4.5 text-[#DC2626]" />
                  <span className="text-xs font-extrabold text-[#DC2626] uppercase">Base de Datos Bloqueada</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* METRICS / MONITOR STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4.5 rounded-xl border border-[#1E2A5E]/8 flex items-center gap-3.5 shadow-sm">
            <div className="h-10 w-10 bg-[#EEF2FF] text-[#3730A3] rounded-lg flex items-center justify-center shrink-0">
              <HardDrive className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-[#6B7280] font-bold uppercase block leading-none mb-1">Tamaño BD</span>
              <span className="text-base font-extrabold text-[#1E2A5E]">{dbSize} KB</span>
            </div>
          </div>
          <div className="bg-white p-4.5 rounded-xl border border-[#1E2A5E]/8 flex items-center gap-3.5 shadow-sm">
            <div className="h-10 w-10 bg-[#EFF8F4] text-[#2D9B6F] rounded-lg flex items-center justify-center shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-[#6B7280] font-bold uppercase block leading-none mb-1">Carga CPU</span>
              <span className="text-base font-extrabold text-[#1E2A5E]">{performanceCpu}%</span>
            </div>
          </div>
          <div className="bg-white p-4.5 rounded-xl border border-[#1E2A5E]/8 flex items-center gap-3.5 shadow-sm">
            <div className="h-10 w-10 bg-[#FFFBEB] text-[#D97706] rounded-lg flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-[#6B7280] font-bold uppercase block leading-none mb-1">Rendimiento QPS</span>
              <span className="text-base font-extrabold text-[#1E2A5E]">{performanceQps} trans/s</span>
            </div>
          </div>
          <div className="bg-white p-4.5 rounded-xl border border-[#1E2A5E]/8 flex items-center gap-3.5 shadow-sm">
            <div className="h-10 w-10 bg-[#EFF8F4] text-[#2D9B6F] rounded-lg flex items-center justify-center shrink-0">
              <Wifi className="h-5 w-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-[#6B7280] font-bold uppercase block leading-none mb-1">Sesiones Activas</span>
              <span className="text-base font-extrabold text-[#1E2A5E]">{activeConnections.length}</span>
            </div>
          </div>
        </div>

        {/* TABS CONTROLLERS */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#F0F0F4] pb-4">
          <button
            onClick={() => setActiveTab("seguridad")}
            className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === "seguridad"
                ? "bg-[#1E2A5E] text-white shadow-md"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              1. Seguridad y Acceso
            </span>
          </button>
          <button
            onClick={() => setActiveTab("datos")}
            className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === "datos"
                ? "bg-[#1E2A5E] text-white shadow-md"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              2. Consola CRUD
            </span>
          </button>
          <button
            onClick={() => setActiveTab("respaldos")}
            className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === "respaldos"
                ? "bg-[#1E2A5E] text-white shadow-md"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <History className="h-4 w-4" />
              3. Respaldos
            </span>
          </button>
          <button
            onClick={() => setActiveTab("monitoreo")}
            className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === "monitoreo"
                ? "bg-[#1E2A5E] text-white shadow-md"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              4. Auditoría y Bitácora
            </span>
          </button>
          <button
            onClick={() => setActiveTab("sql")}
            className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === "sql"
                ? "bg-[#1E2A5E] text-white shadow-md"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              5. Scripts SQL
            </span>
          </button>
          <button
            onClick={() => setActiveTab("rubrica")}
            className={`px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === "rubrica"
                ? "bg-[#1E2A5E] text-white shadow-md"
                : "bg-white text-[#6B7280] border border-[#F0F0F4] hover:bg-[#F5F6FA] hover:text-[#1E2A5E]"
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rúbrica / Rúbrica
            </span>
          </button>
        </div>

        {/* MAIN PANEL CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-12 space-y-8">

            {/* ==================================================== */}
            {/* TAB 1: SEGURIDAD Y ACCESO */}
            {/* ==================================================== */}
            {activeTab === "seguridad" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LOGIN FORM OR LOGGED STATE */}
                <div className="lg:col-span-5 space-y-6">
                  {!isLoggedIn ? (
                    <div className="academic-card bg-white border-t-4 border-t-[#E8A020]">
                      <span className="eyebrow-label block mb-2">Ingresar al Motor Corporativo</span>
                      <h2 className="card-title mb-6 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-[#E8A020]" />
                        Autenticación SQL
                      </h2>
                      
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-[#6B7280] mb-1.5">Usuario de Base de Datos</label>
                          <input
                            type="text"
                            value={loginUser}
                            onChange={(e) => setLoginUser(e.target.value)}
                            placeholder="Ej. admin, supervisor..."
                            className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-3 rounded-lg focus:bg-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-[#6B7280] mb-1.5">Contraseña (Identificación)</label>
                          <input
                            type="password"
                            value={loginPass}
                            onChange={(e) => setLoginPass(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-3 rounded-lg focus:bg-white transition-colors"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#1E2A5E] hover:bg-[#2D3E82] text-white text-xs font-bold uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Unlock className="h-4 w-4" />
                          Conectar a la Base de Datos
                        </button>
                      </form>

                      {/* Quick suggested credentials */}
                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <span className="text-[10px] text-[#6B7280] font-bold uppercase block mb-3">Accesos sugeridos (Rápido):</span>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleQuickLogin("admin", "admin123")}
                            className="w-full flex justify-between items-center bg-slate-50 hover:bg-[#EEF2FF] hover:border-[#BFDBFE] border border-slate-100 p-2.5 rounded-lg transition-all text-xs text-left cursor-pointer"
                          >
                            <div>
                              <span className="font-extrabold text-[#1E2A5E]">admin</span>
                              <span className="text-[10px] text-[#6B7280] block">Rol: Administrador (Completo)</span>
                            </div>
                            <span className="text-[10px] font-bold text-white bg-[#1E2A5E] px-2 py-0.5 rounded">admin123</span>
                          </button>

                          <button
                            onClick={() => handleQuickLogin("supervisor", "super123")}
                            className="w-full flex justify-between items-center bg-slate-50 hover:bg-[#EFF8F4] hover:border-[#A7F3D0] border border-slate-100 p-2.5 rounded-lg transition-all text-xs text-left cursor-pointer"
                          >
                            <div>
                              <span className="font-extrabold text-[#1E2A5E]">supervisor</span>
                              <span className="text-[10px] text-[#6B7280] block">Rol: Supervisor (CRUD, no Delete)</span>
                            </div>
                            <span className="text-[10px] font-bold text-white bg-[#2D9B6F] px-2 py-0.5 rounded">super123</span>
                          </button>

                          <button
                            onClick={() => handleQuickLogin("standard_user", "std123")}
                            className="w-full flex justify-between items-center bg-slate-50 hover:bg-slate-100 border border-slate-100 p-2.5 rounded-lg transition-all text-xs text-left cursor-pointer"
                          >
                            <div>
                              <span className="font-extrabold text-[#1E2A5E]">standard_user</span>
                              <span className="text-[10px] text-[#6B7280] block">Rol: Usuario Estándar (Lectura/Insert)</span>
                            </div>
                            <span className="text-[10px] font-bold text-white bg-slate-500 px-2 py-0.5 rounded">std123</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="academic-card bg-white border-t-4 border-t-[#2D9B6F]">
                      <span className="eyebrow-label block mb-2">Estado de Conexión</span>
                      <h2 className="card-title mb-6 text-[#2D9B6F]">Autenticado Exitosamente</h2>
                      
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3.5 mb-6 text-left">
                        <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                          <span className="text-xs text-[#6B7280]">Usuario</span>
                          <span className="text-xs font-extrabold text-[#1E2A5E]">{currentUser}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                          <span className="text-xs text-[#6B7280]">Rol Asignado</span>
                          <span className="text-xs font-bold text-white bg-[#1E2A5E] px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                            {currentRole}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-[#6B7280]">Permisos Activos</span>
                          <span className="text-xs font-bold text-[#2D9B6F] text-right">
                            {currentRole === "Administrador" ? "FULL (ALL PRIVILEGES)" :
                             currentRole === "Supervisor" ? "SELECT, INSERT, UPDATE" :
                             "SELECT, INSERT (LIMITADOS)"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab("datos")}
                          className="w-full bg-[#1E2A5E] hover:bg-[#2D3E82] text-white text-xs font-bold uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Database className="h-4 w-4" />
                          Ir a Consola CRUD
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full bg-white border border-[#DC2626] text-[#DC2626] hover:bg-[#FFF5F5] text-xs font-bold uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          Desconectar Servidor
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* USER REGISTRY AND DATABASE USERS */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  
                  {/* Register user form (Visible to all, but actions blocked if not admin) */}
                  <div className="academic-card bg-white">
                    <span className="eyebrow-label block mb-2">Administrador de Usuarios</span>
                    <h2 className="card-title mb-6">Crear Nuevo Usuario de Base de Datos</h2>
                    
                    <form onSubmit={handleRegisterUser} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Nombre Usuario</label>
                        <input
                          type="text"
                          value={newRegUser}
                          onChange={(e) => setNewRegUser(e.target.value)}
                          placeholder="Ej. auditor_corp"
                          disabled={!isLoggedIn || currentRole !== "Administrador"}
                          className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-3 rounded-lg focus:bg-white transition-colors disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Contraseña</label>
                        <input
                          type="password"
                          value={newRegPass}
                          onChange={(e) => setNewRegPass(e.target.value)}
                          placeholder="Clave acceso"
                          disabled={!isLoggedIn || currentRole !== "Administrador"}
                          className="w-full bg-slate-50 border border-slate-200 text-xs px-3.5 py-3 rounded-lg focus:bg-white transition-colors disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Rol Asignado (DCL)</label>
                        <select
                          value={newRegRole}
                          onChange={(e) => setNewRegRole(e.target.value as Role)}
                          disabled={!isLoggedIn || currentRole !== "Administrador"}
                          className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-3 rounded-lg focus:bg-white transition-colors disabled:opacity-50 font-semibold text-[#1E2A5E]"
                        >
                          <option value="Administrador">Administrador</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Usuario estándar">Usuario estándar</option>
                        </select>
                      </div>
                      <div className="md:col-span-3 pt-2">
                        <button
                          type="submit"
                          disabled={!isLoggedIn || currentRole !== "Administrador"}
                          className="w-full md:w-auto bg-[#2D9B6F] hover:bg-[#3BB882] text-white text-xs font-bold uppercase px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                        >
                          <Plus className="h-4 w-4" />
                          Crear y Registrar Usuario (SQL CREATE USER)
                        </button>
                        {(!isLoggedIn || currentRole !== "Administrador") && (
                          <span className="text-[10px] text-[#DC2626] font-bold block mt-2">
                            ⚠️ Debe iniciar sesión como Administrador para agregar o habilitar usuarios en el motor.
                          </span>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Registered Users List */}
                  <div className="academic-card bg-white">
                    <h3 className="text-sm font-extrabold text-[#1E2A5E] mb-4 flex items-center gap-2">
                      <Users className="h-4.5 w-4.5 text-[#1E2A5E]" />
                      Usuarios y Roles en el Motor Corporativo
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-[#6B7280]">
                            <th className="pb-3">Usuario DB</th>
                            <th className="pb-3">Rol / Permisos</th>
                            <th className="pb-3">Estado</th>
                            <th className="pb-3 text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {Object.entries(usersDB).map(([username, info]) => (
                            <tr key={username} className="text-xs hover:bg-slate-50/50">
                              <td className="py-3.5 font-extrabold text-[#1E2A5E]">{username}</td>
                              <td className="py-3.5">
                                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  info.role === "Administrador" ? "bg-red-50 text-red-600 border border-red-200" :
                                  info.role === "Supervisor" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                                  "bg-slate-100 text-slate-600 border border-slate-200"
                                }`}>
                                  {info.role}
                                </span>
                              </td>
                              <td className="py-3.5">
                                <span className={`inline-flex items-center gap-1 font-semibold ${info.status === "Activo" ? "text-emerald-600" : "text-red-500"}`}>
                                  <span className={`h-1.5 w-1.5 rounded-full ${info.status === "Activo" ? "bg-emerald-500" : "bg-red-500"}`} />
                                  {info.status}
                                </span>
                              </td>
                              <td className="py-3.5 text-right">
                                <button
                                  onClick={() => handleToggleUserStatus(username)}
                                  disabled={username === currentUser}
                                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors ${
                                    info.status === "Activo"
                                      ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
                                  } disabled:opacity-50 cursor-pointer`}
                                >
                                  {info.status === "Activo" ? "Inhabilitar" : "Habilitar"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 2: CONSOLA CRUD */}
            {/* ==================================================== */}
            {activeTab === "datos" && (
              <div className="space-y-6 text-left">
                
                {/* SELECTOR DE TABLAS + BUSCADOR */}
                <div className="bg-white p-5 rounded-xl border border-[#1E2A5E]/8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {(["clientes", "productos", "empleados", "ventas"] as const).map((table) => (
                      <button
                        key={table}
                        onClick={() => {
                          setActiveDBTable(table);
                          handleCancelForm();
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          activeDBTable === table
                            ? "bg-[#1E2A5E] text-white"
                            : "bg-slate-50 text-[#6B7280] border border-[#F0F0F4] hover:bg-slate-100"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Database className="h-3.5 w-3.5" />
                          Tabla: {table}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Search filter */}
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-[#6B7280]" />
                    <input
                      type="text"
                      placeholder={`Buscar en ${activeDBTable}...`}
                      value={dbSearchQuery}
                      onChange={(e) => setDbSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs pl-10 pr-4 py-3 rounded-lg focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* CRUD TABLES DATAGRID */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="academic-card bg-white">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h2 className="card-title uppercase">Registros de {activeDBTable}</h2>
                          <p className="text-[10px] text-[#6B7280] font-bold uppercase mt-1">
                            Consulta: <span className="font-extrabold text-[#1E2A5E]">SELECT * FROM {activeDBTable};</span>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (checkPermission("INSERT", activeDBTable)) {
                              setIsAddingNewRow(true);
                              setEditingId(null);
                            }
                          }}
                          className="bg-[#2D9B6F] hover:bg-[#3BB882] text-white text-xs font-bold uppercase px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          Agregar Registro
                        </button>
                      </div>

                      {/* DATA TABLE VIEW */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-[#6B7280]">
                              <th className="pb-3">ID</th>
                              {activeDBTable === "clientes" && (
                                <>
                                  <th className="pb-3">Nombre</th>
                                  <th className="pb-3">RUC/DNI</th>
                                  <th className="pb-3">Ciudad</th>
                                  <th className="pb-3">Email</th>
                                </>
                              )}
                              {activeDBTable === "productos" && (
                                <>
                                  <th className="pb-3">Nombre</th>
                                  <th className="pb-3">Precio Unit.</th>
                                  <th className="pb-3">Stock</th>
                                  <th className="pb-3">Categoría</th>
                                </>
                              )}
                              {activeDBTable === "empleados" && (
                                <>
                                  <th className="pb-3">Nombre</th>
                                  <th className="pb-3">Puesto</th>
                                  <th className="pb-3">Departamento</th>
                                  <th className="pb-3">Email</th>
                                </>
                              )}
                              {activeDBTable === "ventas" && (
                                <>
                                  <th className="pb-3">Cliente</th>
                                  <th className="pb-3">Total Venta</th>
                                  <th className="pb-3">Fecha</th>
                                  <th className="pb-3">Estado</th>
                                </>
                              )}
                              <th className="pb-3 text-right">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {filteredData.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="py-8 text-center text-xs text-[#6B7280]">
                                  No se encontraron registros en esta tabla.
                                </td>
                              </tr>
                            ) : (
                              filteredData.map((row: any) => (
                                <tr key={row.id} className="text-xs hover:bg-slate-50/50">
                                  <td className="py-3.5 font-bold text-[#6B7280]">#{row.id}</td>
                                  
                                  {activeDBTable === "clientes" && (
                                    <>
                                      <td className="py-3.5 font-extrabold text-[#1E2A5E]">{row.nombre}</td>
                                      <td className="py-3.5 font-mono">{row.documento}</td>
                                      <td className="py-3.5">{row.ciudad}</td>
                                      <td className="py-3.5 text-[#6B7280]">{row.email}</td>
                                    </>
                                  )}

                                  {activeDBTable === "productos" && (
                                    <>
                                      <td className="py-3.5 font-extrabold text-[#1E2A5E]">{row.nombre}</td>
                                      <td className="py-3.5 font-bold text-emerald-600">S/. {row.precio.toFixed(2)}</td>
                                      <td className="py-3.5">
                                        <span className={`inline-block px-1.5 py-0.5 rounded font-bold text-[10px] ${
                                          row.stock <= 15 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                                        }`}>
                                          {row.stock} unids
                                        </span>
                                      </td>
                                      <td className="py-3.5">{row.categoria}</td>
                                    </>
                                  )}

                                  {activeDBTable === "empleados" && (
                                    <>
                                      <td className="py-3.5 font-extrabold text-[#1E2A5E]">{row.nombre}</td>
                                      <td className="py-3.5">{row.puesto}</td>
                                      <td className="py-3.5">
                                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold text-[9px] uppercase">
                                          {row.departamento}
                                        </span>
                                      </td>
                                      <td className="py-3.5 text-[#6B7280]">{row.email}</td>
                                    </>
                                  )}

                                  {activeDBTable === "ventas" && (
                                    <>
                                      <td className="py-3.5 font-extrabold text-[#1E2A5E]">{row.cliente}</td>
                                      <td className="py-3.5 font-bold text-indigo-700">S/. {row.total.toFixed(2)}</td>
                                      <td className="py-3.5 font-mono text-[11px]">{row.fecha}</td>
                                      <td className="py-3.5">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                          row.estado === "Completada" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                        }`}>
                                          {row.estado}
                                        </span>
                                      </td>
                                    </>
                                  )}

                                  <td className="py-3.5 text-right">
                                    <div className="flex justify-end gap-1.5">
                                      <button
                                        onClick={() => handleEditClick(row)}
                                        className="p-1.5 hover:bg-slate-100 text-slate-500 rounded transition-colors cursor-pointer"
                                        title="Editar Registro"
                                      >
                                        <Edit2 className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteRecord(row.id)}
                                        className="p-1.5 hover:bg-red-50 text-red-500 rounded transition-colors cursor-pointer"
                                        title="Eliminar Registro"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* FORM TO ADD/EDIT (DOCK ON THE RIGHT) */}
                  <div className="lg:col-span-4 space-y-6">
                    {isAddingNewRow ? (
                      <div className="academic-card bg-white border-l-4 border-l-[#1E2A5E]">
                        <span className="eyebrow-label block mb-2">{editingId ? "Editar Registro" : "Nuevo Registro"}</span>
                        <h2 className="card-title mb-6">
                          {editingId ? `Modificar ID #${editingId}` : `Insertar en ${activeDBTable}`}
                        </h2>

                        <form onSubmit={handleSaveRecord} className="space-y-4">
                          
                          {/* CLIENT FORM */}
                          {activeDBTable === "clientes" && (
                            <>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Nombre Completo *</label>
                                <input
                                  type="text"
                                  value={clienteForm.nombre}
                                  onChange={(e) => setClienteForm({ ...clienteForm, nombre: e.target.value })}
                                  placeholder="Ej. Juan Pérez"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">RUC o DNI *</label>
                                <input
                                  type="text"
                                  value={clienteForm.documento}
                                  onChange={(e) => setClienteForm({ ...clienteForm, documento: e.target.value })}
                                  placeholder="RUC/DNI"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Ciudad</label>
                                <input
                                  type="text"
                                  value={clienteForm.ciudad}
                                  onChange={(e) => setClienteForm({ ...clienteForm, ciudad: e.target.value })}
                                  placeholder="Ciudad"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Correo Electrónico</label>
                                <input
                                  type="email"
                                  value={clienteForm.email}
                                  onChange={(e) => setClienteForm({ ...clienteForm, email: e.target.value })}
                                  placeholder="juan@mail.com"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                />
                              </div>
                            </>
                          )}

                          {/* PRODUCT FORM */}
                          {activeDBTable === "productos" && (
                            <>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Nombre del Producto *</label>
                                <input
                                  type="text"
                                  value={productoForm.nombre}
                                  onChange={(e) => setProductoForm({ ...productoForm, nombre: e.target.value })}
                                  placeholder="Ej. Laptop Asus Zenbook"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Precio (S/.) *</label>
                                <input
                                  type="number"
                                  value={productoForm.precio || ""}
                                  onChange={(e) => setProductoForm({ ...productoForm, precio: parseFloat(e.target.value) || 0 })}
                                  placeholder="Precio unitario"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Stock Inicial *</label>
                                <input
                                  type="number"
                                  value={productoForm.stock || ""}
                                  onChange={(e) => setProductoForm({ ...productoForm, stock: parseInt(e.target.value) || 0 })}
                                  placeholder="Cantidad stock"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Categoría</label>
                                <select
                                  value={productoForm.categoria}
                                  onChange={(e) => setProductoForm({ ...productoForm, categoria: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg"
                                >
                                  <option value="Tecnología">Tecnología</option>
                                  <option value="Accesorios">Accesorios</option>
                                  <option value="Mobiliario">Mobiliario</option>
                                </select>
                              </div>
                            </>
                          )}

                          {/* EMPLEADO FORM */}
                          {activeDBTable === "empleados" && (
                            <>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Nombre Completo *</label>
                                <input
                                  type="text"
                                  value={empleadoForm.nombre}
                                  onChange={(e) => setEmpleadoForm({ ...empleadoForm, nombre: e.target.value })}
                                  placeholder="Nombre completo"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Puesto Laboral *</label>
                                <input
                                  type="text"
                                  value={empleadoForm.puesto}
                                  onChange={(e) => setEmpleadoForm({ ...empleadoForm, puesto: e.target.value })}
                                  placeholder="Ej. Programador Senior"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Departamento</label>
                                <input
                                  type="text"
                                  value={empleadoForm.departamento}
                                  onChange={(e) => setEmpleadoForm({ ...empleadoForm, departamento: e.target.value })}
                                  placeholder="Ej. TI, Administración"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Email Corporativo</label>
                                <input
                                  type="email"
                                  value={empleadoForm.email}
                                  onChange={(e) => setEmpleadoForm({ ...empleadoForm, email: e.target.value })}
                                  placeholder="empleado@uprit.edu.pe"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                />
                              </div>
                            </>
                          )}

                          {/* VENTAS FORM */}
                          {activeDBTable === "ventas" && (
                            <>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Nombre del Cliente *</label>
                                <input
                                  type="text"
                                  value={ventaForm.cliente}
                                  onChange={(e) => setVentaForm({ ...ventaForm, cliente: e.target.value })}
                                  placeholder="Cliente de la venta"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Monto Total (S/.) *</label>
                                <input
                                  type="number"
                                  value={ventaForm.total || ""}
                                  onChange={(e) => setVentaForm({ ...ventaForm, total: parseFloat(e.target.value) || 0 })}
                                  placeholder="Importe de venta"
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg focus:bg-white"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1">Estado de Transacción</label>
                                <select
                                  value={ventaForm.estado}
                                  onChange={(e) => setVentaForm({ ...ventaForm, estado: e.target.value })}
                                  className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-lg"
                                >
                                  <option value="Completada">Completada</option>
                                  <option value="Procesando">Procesando</option>
                                  <option value="Rechazada">Rechazada</option>
                                </select>
                              </div>
                            </>
                          )}

                          <div className="flex gap-2 pt-2">
                            <button
                              type="submit"
                              className="flex-1 bg-[#1E2A5E] hover:bg-[#2D3E82] text-white text-[11px] font-bold uppercase py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Save className="h-4 w-4" />
                              Guardar Cambios
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelForm}
                              className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-[#6B7280] text-[11px] font-bold uppercase py-2.5 rounded-lg cursor-pointer"
                            >
                              Cancelar
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="academic-card bg-slate-50/50 border border-slate-100 flex flex-col justify-center items-center text-center p-8 min-h-[300px]">
                        <Database className="h-10 w-10 text-[#6B7280]/40 mb-4" />
                        <h4 className="text-xs font-extrabold text-[#1E2A5E] uppercase mb-1">Consola Lista</h4>
                        <p className="text-[11px] text-[#6B7280] leading-relaxed max-w-xs">
                          Selecciona un registro para modificarlo, pulsa eliminar, o crea una nueva fila. Las acciones se validarán según el rol activo.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 3: RESPALDOS Y RECUPERACIÓN */}
            {/* ==================================================== */}
            {activeTab === "respaldos" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                
                {/* ACTION BLOCK FOR BACKUP */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="academic-card bg-white border-t-4 border-t-[#E8A020]">
                    <span className="eyebrow-label block mb-2">Seguridad de la Información</span>
                    <h2 className="card-title mb-6">Generador de Respaldos (Backup)</h2>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                      Crea una copia de seguridad instantánea que almacena el estado completo de las tablas de Clientes, Productos, Empleados y Ventas. El respaldo se guarda con la fecha, hora exacta y el usuario que gatilló la acción.
                    </p>
                    
                    <button
                      onClick={handleCreateBackup}
                      className="w-full bg-[#1E2A5E] hover:bg-[#2D3E82] text-white text-xs font-bold uppercase py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="h-4.5 w-4.5 text-[#E8A020]" />
                      Generar Copia de Seguridad
                    </button>
                  </div>

                  <div className="academic-card bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-extrabold text-[#1E2A5E] uppercase mb-3 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-[#E8A020]" />
                      Nota de Recuperación (RESTORE)
                    </h4>
                    <p className="text-[11px] text-[#6B7280] leading-relaxed space-y-2">
                      <span>La restauración reescribe las tablas del motor activo. Para ejecutar una restauración, el usuario de base de datos requiere privilegios elevados (<strong>Administrador</strong> o <strong>Supervisor</strong>).</span>
                    </p>
                  </div>
                </div>

                {/* BACKUPS HISTORY LIST */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="academic-card bg-white">
                    <span className="eyebrow-label block mb-2">Historial de Copias</span>
                    <h2 className="card-title mb-6">Respaldos Almacenados en el Servidor</h2>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-[#6B7280]">
                            <th className="pb-3">Código Backup</th>
                            <th className="pb-3">Fecha y Hora</th>
                            <th className="pb-3">Tamaño</th>
                            <th className="pb-3">Tablas</th>
                            <th className="pb-3">Generado por</th>
                            <th className="pb-3 text-right">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {backupsList.map((bk) => (
                            <tr key={bk.id} className="text-xs hover:bg-slate-50/50">
                              <td className="py-4 font-mono font-extrabold text-[#1E2A5E]">{bk.id}</td>
                              <td className="py-4 font-mono text-[11px] text-[#6B7280]">{bk.timestamp}</td>
                              <td className="py-4 font-bold text-emerald-600">{bk.sizeKb} KB</td>
                              <td className="py-4">
                                <span className="inline-flex items-center gap-1 bg-[#EEF2FF] border border-[#C7D2FE] px-2 py-0.5 rounded text-[10px] font-bold text-[#3730A3]">
                                  <Layers className="h-3 w-3" />
                                  {bk.tablesCount} tablas
                                </span>
                              </td>
                              <td className="py-4 font-semibold text-[#1E2A5E]">{bk.created_by}</td>
                              <td className="py-4 text-right">
                                <button
                                  onClick={() => handleRestoreBackup(bk)}
                                  className="bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-[#EFF8F4] text-[10px] font-bold uppercase px-3 py-1.5 rounded transition-all cursor-pointer"
                                >
                                  Restaurar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 4: AUDITORÍA Y BITÁCORA */}
            {/* ==================================================== */}
            {activeTab === "monitoreo" && (
              <div className="space-y-6 text-left">
                
                {/* ACTIVE CONNECTIONS & METRICS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* ACTIVE SESSIONS LIST */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="academic-card bg-white">
                      <span className="eyebrow-label block mb-2">Monitoreo en Vivo</span>
                      <h2 className="card-title mb-6 flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D9B6F] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D9B6F]"></span>
                        </span>
                        Conexiones Activas
                      </h2>
                      
                      <div className="space-y-3">
                        {activeConnections.map((conn) => (
                          <div key={conn.id} className="p-3 bg-slate-50 border border-slate-100 hover:border-indigo-100 rounded-xl flex items-center justify-between text-xs transition-all">
                            <div className="flex items-center gap-2.5">
                              <div className="h-8 w-8 rounded bg-indigo-50 text-[#1E2A5E] flex items-center justify-center font-bold">
                                <Users className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="font-extrabold text-[#1E2A5E] block">{conn.user}</span>
                                <span className="text-[10px] text-[#6B7280]">{conn.client} · {conn.ip}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] font-bold text-white bg-[#1E2A5E] px-2 py-0.5 rounded block uppercase mb-1">
                                {conn.role}
                              </span>
                              <span className="text-[9px] text-[#6B7280] block font-mono">Conex: {conn.connectedAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* LOGS AUDIT TRAIL */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="academic-card bg-white">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="eyebrow-label block mb-2">Auditoría Corporativa</span>
                          <h2 className="card-title">Bitácora de Operaciones (SYS_LOG)</h2>
                        </div>
                        <button
                          onClick={() => {
                            setLogs([]);
                            showToast("Bitácora de logs vaciada", "info");
                          }}
                          className="text-[#DC2626] border border-[#DC2626]/20 hover:bg-[#FFF5F5] text-[10px] font-bold uppercase px-3 py-1.5 rounded transition-all cursor-pointer"
                        >
                          Limpiar Logs
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                        {logs.length === 0 ? (
                          <p className="text-xs text-center text-[#6B7280] py-8">La bitácora de auditoría se encuentra vacía.</p>
                        ) : (
                          logs.map((log) => (
                            <div key={log.id} className={`p-3 rounded-lg border text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                              log.status === "Denegado" ? "bg-[#FFF5F5] border-[#FCA5A5]" :
                              log.status === "Fallo" ? "bg-amber-50 border-amber-200" :
                              "bg-slate-50 border-slate-100"
                            }`}>
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="font-mono text-[9px] text-[#6B7280] font-semibold">{log.timestamp}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                                    log.operation.includes("LOGIN") ? "bg-indigo-100 text-[#3730A3]" :
                                    log.operation === "ACCESS_DENIED" ? "bg-red-100 text-red-700" :
                                    "bg-emerald-100 text-[#2D9B6F]"
                                  }`}>
                                    {log.operation}
                                  </span>
                                  <span className="text-[10px] text-[#6B7280] font-semibold">
                                    Tabla: <strong className="text-[#1E2A5E] font-extrabold">{log.table}</strong>
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-700 font-medium leading-relaxed">{log.details}</p>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-[10px] font-extrabold text-[#1E2A5E] block">{log.user}</span>
                                <span className={`text-[9px] font-bold uppercase ${
                                  log.status === "Éxito" ? "text-emerald-600" : "text-red-500"
                                }`}>
                                  {log.status === "Denegado" ? "Acceso Denegado" : log.status}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 5: SCRIPTS SQL */}
            {/* ==================================================== */}
            {activeTab === "sql" && (
              <div className="space-y-8 text-left">

                {/* --- Script Block --- */}
                <div className="academic-card bg-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <span className="eyebrow-label block mb-2">Código Fuente Base</span>
                      <h2 className="card-title">Scripts SQL de Inicialización Corporativa</h2>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Código DDL (Tablas) y DCL (Control de Accesos/Usuarios) listo para ejecutar en <strong>PostgreSQL 15+</strong> con pgAdmin 4.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopySQL}
                        className="bg-white border border-[#1E2A5E]/20 text-[#1E2A5E] hover:bg-slate-50 text-xs font-bold uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="h-4 w-4 text-[#2D9B6F]" /> : <Copy className="h-4 w-4" />}
                        {isCopied ? "Copiado" : "Copiar Script"}
                      </button>
                      <button
                        onClick={handleDownloadSQL}
                        className="bg-[#1E2A5E] hover:bg-[#2D3E82] text-white text-xs font-bold uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="h-4 w-4 text-[#E8A020]" />
                        Descargar .SQL
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#1E2A3E] text-slate-100 rounded-xl p-5 font-mono text-[11px] overflow-x-auto max-h-[500px] leading-relaxed border border-slate-800">
                    <pre className="text-left whitespace-pre">{sqlScriptContent}</pre>
                  </div>
                </div>

                {/* ================================================== */}
                {/* TUTORIAL PGADMIN 4 */}
                {/* ================================================== */}
                <div className="academic-card bg-white">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-[#336791]/10 flex items-center justify-center shrink-0">
                      <Database className="h-5 w-5 text-[#336791]" />
                    </div>
                    <div>
                      <span className="eyebrow-label block">Implementación Real</span>
                      <h2 className="card-title">Guía de Despliegue en pgAdmin 4 — PostgreSQL</h2>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B7280] mb-8 ml-12">
                    Sigue estos 6 pasos para crear la base de datos corporativa en tu instancia local de PostgreSQL usando la interfaz gráfica de pgAdmin 4.
                  </p>

                  {/* Steps */}
                  <div className="space-y-6">

                    {/* STEP 1 */}
                    <div className="rounded-2xl border border-[#336791]/20 overflow-hidden">
                      {/* Step header */}
                      <div className="bg-[#336791] px-5 py-3 flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center shrink-0">1</span>
                        <MonitorDot className="h-4 w-4 text-white/80 shrink-0" />
                        <h3 className="text-sm font-bold text-white">Conectar al Servidor PostgreSQL</h3>
                      </div>
                      {/* pgAdmin UI mockup */}
                      <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                        {/* Sidebar */}
                        <div className="md:col-span-4 bg-[#21262D] p-4 border-r border-slate-700">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Browser</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                              <span className="text-[10px]">🖥️</span>
                              <span className="text-[11px] font-semibold">Servers (1)</span>
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-[#336791]/30 border border-[#336791]/40 cursor-pointer ml-3">
                              <span className="text-[10px]">🐘</span>
                              <span className="text-[11px] font-bold text-[#79C0FF]">PostgreSQL 15</span>
                              <span className="ml-auto text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">ONLINE</span>
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 ml-6">
                              <FolderOpen className="h-3 w-3 text-[#E8A020]" />
                              <span className="text-[10px] text-slate-400">Databases</span>
                            </div>
                            <div className="flex items-center gap-2 px-2 py-1 ml-6">
                              <FolderOpen className="h-3 w-3 text-slate-500" />
                              <span className="text-[10px] text-slate-500">Login/Group Roles</span>
                            </div>
                          </div>
                        </div>
                        {/* Content */}
                        <div className="md:col-span-8 p-5">
                          <p className="text-[11px] font-bold text-[#1E2A5E] mb-3">Acción requerida:</p>
                          <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                            <li className="flex gap-2"><span className="text-[#336791] font-bold shrink-0">①</span> Abre pgAdmin 4 desde el menú de inicio.</li>
                            <li className="flex gap-2"><span className="text-[#336791] font-bold shrink-0">②</span> En el panel <strong>Browser</strong> (izquierda), expande <code className="bg-slate-100 px-1 rounded text-[10px]">Servers</code>.</li>
                            <li className="flex gap-2"><span className="text-[#336791] font-bold shrink-0">③</span> Haz doble clic en <code className="bg-slate-100 px-1 rounded text-[10px]">PostgreSQL 15</code> e ingresa tu contraseña de <strong>postgres</strong>.</li>
                            <li className="flex gap-2"><span className="text-[#336791] font-bold shrink-0">④</span> El ícono del servidor cambiará a <span className="text-emerald-600 font-bold">verde ●</span> indicando conexión activa.</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* STEP 2 */}
                    <div className="rounded-2xl border border-[#E8A020]/30 overflow-hidden">
                      <div className="bg-[#E8A020] px-5 py-3 flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center shrink-0">2</span>
                        <Database className="h-4 w-4 text-white/80 shrink-0" />
                        <h3 className="text-sm font-bold text-white">Crear la Base de Datos: <code className="bg-white/20 px-1.5 rounded">corporativo_db</code></h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                        {/* Context menu mockup */}
                        <div className="md:col-span-5 bg-slate-50 border-r border-slate-100 p-4 flex items-start justify-center">
                          <div className="bg-white border border-slate-200 rounded-lg shadow-xl text-[11px] min-w-[200px] overflow-hidden">
                            <div className="bg-[#21262D] px-3 py-2 text-slate-300 text-[10px] font-bold">Menú contextual — Databases</div>
                            <div className="divide-y divide-slate-100">
                              <div className="px-4 py-2 hover:bg-[#336791]/5 text-[#6B7280]">Refresh...</div>
                              <div className="px-4 py-2 bg-[#336791]/10 text-[#336791] font-bold flex items-center gap-2">
                                <Plus className="h-3 w-3" /> Create → Database...
                              </div>
                              <div className="px-4 py-2 hover:bg-slate-50 text-[#6B7280]">Query Tool</div>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-7 p-5">
                          <p className="text-[11px] font-bold text-[#1E2A5E] mb-3">Acción requerida:</p>
                          <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                            <li className="flex gap-2"><span className="text-[#E8A020] font-bold shrink-0">①</span> Clic derecho sobre <code className="bg-slate-100 px-1 rounded text-[10px]">Databases</code> → <strong>Create → Database...</strong></li>
                            <li className="flex gap-2"><span className="text-[#E8A020] font-bold shrink-0">②</span> En el campo <strong>Database</strong> escribe: <code className="bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold text-amber-700">corporativo_db</code></li>
                            <li className="flex gap-2"><span className="text-[#E8A020] font-bold shrink-0">③</span> En <strong>Owner</strong>, selecciona <code className="bg-slate-100 px-1 rounded text-[10px]">postgres</code>.</li>
                            <li className="flex gap-2"><span className="text-[#E8A020] font-bold shrink-0">④</span> Haz clic en <strong>Save</strong>. La BD aparecerá en el árbol.</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3 */}
                    <div className="rounded-2xl border border-[#2D9B6F]/30 overflow-hidden">
                      <div className="bg-[#2D9B6F] px-5 py-3 flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center shrink-0">3</span>
                        <Terminal className="h-4 w-4 text-white/80 shrink-0" />
                        <h3 className="text-sm font-bold text-white">Ejecutar el Script DDL — Crear Tablas</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
                        <div className="md:col-span-5 bg-[#1E2A3E] p-4 border-r border-slate-700 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                            <span className="text-[9px] text-slate-500 ml-1 font-mono">Query Tool — corporativo_db</span>
                          </div>
                          <div className="font-mono text-[10px] text-slate-300 leading-relaxed flex-1">
                            <span className="text-[#79C0FF]">CREATE TABLE</span> <span className="text-[#F0883E]">clientes</span> (<br/>
                            &nbsp;&nbsp;id <span className="text-[#79C0FF]">SERIAL PRIMARY KEY</span>,<br/>
                            &nbsp;&nbsp;nombre <span className="text-[#79C0FF]">VARCHAR</span>(100),<br/>
                            &nbsp;&nbsp;...<br/>
                            );<br/>
                            <br/>
                            <span className="text-[#79C0FF]">CREATE TABLE</span> <span className="text-[#F0883E]">productos</span> (<br/>
                            &nbsp;&nbsp;id <span className="text-[#79C0FF]">SERIAL PRIMARY KEY</span>,<br/>
                            &nbsp;&nbsp;...<br/>
                            );
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2">
                            <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">✓ Query returned successfully</span>
                          </div>
                        </div>
                        <div className="md:col-span-7 p-5">
                          <p className="text-[11px] font-bold text-[#1E2A5E] mb-3">Acción requerida:</p>
                          <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                            <li className="flex gap-2"><span className="text-[#2D9B6F] font-bold shrink-0">①</span> Expande <code className="bg-slate-100 px-1 rounded text-[10px]">corporativo_db</code> en el árbol.</li>
                            <li className="flex gap-2"><span className="text-[#2D9B6F] font-bold shrink-0">②</span> Clic derecho sobre la BD → <strong>Query Tool</strong>.</li>
                            <li className="flex gap-2"><span className="text-[#2D9B6F] font-bold shrink-0">③</span> Pega el script descargado con el botón <strong>"Descargar .SQL"</strong> de arriba.</li>
                            <li className="flex gap-2"><span className="text-[#2D9B6F] font-bold shrink-0">④</span> Presiona <kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-[9px] font-mono">F5</kbd> o el botón <strong>▶ Execute</strong> para correr todo el script.</li>
                            <li className="flex gap-2"><span className="text-[#2D9B6F] font-bold shrink-0">⑤</span> Verifica el mensaje <span className="text-emerald-600 font-bold">"Query returned successfully"</span> en el panel inferior.</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    {/* STEP 4 */}
                    <div className="rounded-2xl border border-[#7C3AED]/30 overflow-hidden">
                      <div className="bg-[#7C3AED] px-5 py-3 flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center shrink-0">4</span>
                        <UserCog className="h-4 w-4 text-white/80 shrink-0" />
                        <h3 className="text-sm font-bold text-white">Crear Roles y Usuario <code className="bg-white/20 px-1.5 rounded">grupo2</code></h3>
                      </div>
                      <div className="bg-white p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                          {/* Create role steps */}
                          <div className="bg-[#7C3AED]/5 border border-[#7C3AED]/20 rounded-xl p-4">
                            <h4 className="text-[10px] font-extrabold text-[#7C3AED] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <Key className="h-3.5 w-3.5" /> Crear Roles en pgAdmin
                            </h4>
                            <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                              <li className="flex gap-2"><span className="text-[#7C3AED] font-bold shrink-0">①</span> En el árbol: <code className="bg-slate-100 px-1 rounded text-[10px]">Login/Group Roles</code> → clic derecho → <strong>Create → Login/Group Role...</strong></li>
                              <li className="flex gap-2"><span className="text-[#7C3AED] font-bold shrink-0">②</span> Pestaña <strong>General</strong> → Name: <code className="bg-violet-50 border border-violet-200 px-1.5 rounded text-[10px] font-bold text-violet-700">Rol_Administrador</code></li>
                              <li className="flex gap-2"><span className="text-[#7C3AED] font-bold shrink-0">③</span> Pestaña <strong>Privileges</strong> → activa <em>Can Login: No</em> (es un rol de grupo).</li>
                              <li className="flex gap-2"><span className="text-[#7C3AED] font-bold shrink-0">④</span> Repite para <code className="bg-slate-100 px-1 rounded text-[10px]">Rol_Supervisor</code> y <code className="bg-slate-100 px-1 rounded text-[10px]">Rol_UsuarioEstandar</code>.</li>
                            </ol>
                          </div>
                          {/* Create user */}
                          <div className="bg-[#1E2A5E]/5 border border-[#1E2A5E]/20 rounded-xl p-4">
                            <h4 className="text-[10px] font-extrabold text-[#1E2A5E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5" /> Crear Usuario <code>grupo2</code>
                            </h4>
                            <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                              <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">①</span> Clic derecho → <strong>Create → Login/Group Role...</strong></li>
                              <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">②</span> <strong>General</strong>: Name = <code className="bg-slate-100 px-1 rounded text-[10px] font-bold">grupo2</code></li>
                              <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">③</span> <strong>Definition</strong>: Password = <code className="bg-slate-100 px-1 rounded text-[10px]">••••••••••</code></li>
                              <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">④</span> <strong>Privileges</strong>: activa <em>Can Login: Yes</em>.</li>
                              <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">⑤</span> <strong>Membership</strong>: agrega <code className="bg-slate-100 px-1 rounded text-[10px]">Rol_Administrador</code> → <strong>Save</strong>.</li>
                            </ol>
                          </div>
                        </div>
                        {/* Membership visual */}
                        <div className="bg-[#21262D] rounded-xl p-4">
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-3">Pestaña Membership — Login Role: grupo2</p>
                          <div className="overflow-x-auto">
                            <table className="w-full text-[10px]">
                              <thead>
                                <tr className="border-b border-slate-700">
                                  <th className="text-left pb-2 text-slate-400 font-semibold pr-8">Role</th>
                                  <th className="text-left pb-2 text-slate-400 font-semibold pr-8">Base de datos</th>
                                  <th className="text-left pb-2 text-slate-400 font-semibold">Admin option</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-700/50">
                                <tr>
                                  <td className="py-2 text-[#79C0FF] font-semibold pr-8">Rol_Administrador</td>
                                  <td className="py-2 text-slate-300 pr-8">corporativo_db</td>
                                  <td className="py-2"><span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[9px] font-bold">✓ Activo</span></td>
                                </tr>
                                <tr>
                                  <td className="py-2 text-slate-500 pr-8">Rol_Supervisor</td>
                                  <td className="py-2 text-slate-600 pr-8">corporativo_db</td>
                                  <td className="py-2"><span className="bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded text-[9px]">No asignado</span></td>
                                </tr>
                                <tr>
                                  <td className="py-2 text-slate-500 pr-8">Rol_UsuarioEstandar</td>
                                  <td className="py-2 text-slate-600 pr-8">corporativo_db</td>
                                  <td className="py-2"><span className="bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded text-[9px]">No asignado</span></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STEP 5 */}
                    <div className="rounded-2xl border border-[#0891B2]/30 overflow-hidden">
                      <div className="bg-[#0891B2] px-5 py-3 flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center shrink-0">5</span>
                        <Shield className="h-4 w-4 text-white/80 shrink-0" />
                        <h3 className="text-sm font-bold text-white">Asignar Permisos GRANT por Rol (DCL)</h3>
                      </div>
                      <div className="bg-white p-5">
                        <p className="text-[11px] text-[#4B5563] mb-4">
                          Ejecuta este bloque DCL en el <strong>Query Tool</strong> de <code className="bg-slate-100 px-1 rounded text-[10px]">corporativo_db</code> para asignar privilegios diferenciados a cada rol:
                        </p>
                        <div className="bg-[#1E2A3E] rounded-xl p-4 font-mono text-[10px] text-slate-200 leading-relaxed overflow-x-auto">
                          <pre className="text-left whitespace-pre">{`-- ① Rol Administrador: acceso total
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO Rol_Administrador;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO Rol_Administrador;

-- ② Rol Supervisor: SELECT, INSERT, UPDATE (sin DELETE)
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO Rol_Supervisor;

-- ③ Rol Usuario Estándar: solo consultas
GRANT SELECT ON ALL TABLES IN SCHEMA public TO Rol_UsuarioEstandar;

-- ④ Asignar usuario grupo2 a un rol
GRANT Rol_Administrador TO grupo2;`}</pre>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                          <p className="text-[10px] text-[#6B7280]">Presiona <kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-[9px] font-mono">F5</kbd> para ejecutar. Verifica con <code className="bg-slate-100 px-1 rounded text-[10px]">\dp</code> en psql o en el panel <strong>Privileges</strong> de cada tabla.</p>
                        </div>
                      </div>
                    </div>

                    {/* STEP 6 */}
                    <div className="rounded-2xl border border-[#DC2626]/30 overflow-hidden">
                      <div className="bg-[#DC2626] px-5 py-3 flex items-center gap-3">
                        <span className="h-7 w-7 rounded-full bg-white/20 text-white text-xs font-black flex items-center justify-center shrink-0">6</span>
                        <ArchiveRestore className="h-4 w-4 text-white/80 shrink-0" />
                        <h3 className="text-sm font-bold text-white">Copia de Seguridad y Restauración (Backup / Restore)</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white">
                        {/* Backup */}
                        <div className="p-5">
                          <h4 className="text-[11px] font-extrabold text-[#DC2626] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <HardDrive className="h-3.5 w-3.5" /> Generar Backup
                          </h4>
                          <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                            <li className="flex gap-2"><span className="text-[#DC2626] font-bold shrink-0">①</span> Clic derecho sobre <code className="bg-slate-100 px-1 rounded text-[10px]">corporativo_db</code> → <strong>Backup...</strong></li>
                            <li className="flex gap-2"><span className="text-[#DC2626] font-bold shrink-0">②</span> <strong>Filename</strong>: <code className="bg-red-50 border border-red-200 px-1.5 rounded text-[10px] font-bold text-red-700">backuplocal</code></li>
                            <li className="flex gap-2"><span className="text-[#DC2626] font-bold shrink-0">③</span> <strong>Format</strong>: <em>Custom</em> (.backup) o <em>Plain</em> (.sql).</li>
                            <li className="flex gap-2"><span className="text-[#DC2626] font-bold shrink-0">④</span> Clic en <strong>Backup</strong>. Aparece el diálogo:<br/>
                              <span className="ml-4 mt-1 block bg-blue-50 border border-blue-200 text-blue-700 text-[10px] px-3 py-1.5 rounded-lg italic">"The backup of database 'corporativo_db' has been completed successfully."</span>
                            </li>
                            <li className="flex gap-2"><span className="text-[#DC2626] font-bold shrink-0">⑤</span> El archivo se guarda en la ruta indicada (ej. <code className="bg-slate-100 px-1 rounded text-[10px]">C:\backuplocal</code>).</li>
                          </ol>
                        </div>
                        {/* Restore */}
                        <div className="p-5 bg-slate-50/50">
                          <h4 className="text-[11px] font-extrabold text-[#1E2A5E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <RefreshCw className="h-3.5 w-3.5" /> Restaurar Backup
                          </h4>
                          <ol className="space-y-2 text-[11px] text-[#4B5563] list-none">
                            <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">①</span> Clic derecho sobre <code className="bg-slate-100 px-1 rounded text-[10px]">corporativo_db</code> → <strong>Restore...</strong></li>
                            <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">②</span> Selecciona el archivo <code className="bg-slate-100 px-1 rounded text-[10px]">backuplocal.backup</code> con el explorador de archivos.</li>
                            <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">③</span> Haz clic en <strong>Restore</strong>.</li>
                            <li className="flex gap-2"><span className="text-[#1E2A5E] font-bold shrink-0">④</span> Verifica con un <strong>Query Tool</strong>:<br/>
                              <code className="ml-4 mt-1 block bg-[#1E2A3E] text-emerald-400 text-[10px] px-3 py-1.5 rounded-lg font-mono">SELECT * FROM clientes;</code>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>

                  </div>{/* end steps */}

                  {/* Footer note */}
                  <div className="mt-8 p-4 bg-[#336791]/5 border border-[#336791]/20 rounded-xl flex items-start gap-3">
                    <BookMarked className="h-5 w-5 text-[#336791] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#1E2A5E] mb-1">Requisito del sistema</p>
                      <p className="text-[11px] text-[#6B7280] leading-relaxed">
                        Necesitas <strong>PostgreSQL 15+</strong> y <strong>pgAdmin 4</strong> instalados. Descárgalos desde{" "}
                        <a href="https://www.postgresql.org/download/" target="_blank" rel="noopener noreferrer" className="text-[#336791] underline font-semibold">postgresql.org</a>.
                        El instalador de Windows incluye pgAdmin 4 de forma automática.
                      </p>
                    </div>
                  </div>

                </div>{/* end tutorial card */}

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 6: RÚBRICA / LISTA DE COTEJO */}
            {/* ==================================================== */}
            {activeTab === "rubrica" && (
              <div className="space-y-6 text-left">
                <div className="academic-card bg-white">
                  <span className="eyebrow-label block mb-2">Evaluación del Docente</span>
                  <h2 className="card-title mb-2">Lista de Cotejo - Actividad Formativa N° 7</h2>
                  <p className="text-xs text-[#6B7280] mb-6">
                    Alineado con el instrumento de evaluación provisto por la Facultad de Derecho y Ciencias Sociales de la UPRIT.
                  </p>

                  <div className="space-y-2">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex gap-3.5 items-start"
                      >
                        <div className="h-5 w-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div className="text-xs font-semibold leading-relaxed">
                          <span className="text-[9px] font-extrabold text-[#3730A3] uppercase block mb-0.5">
                            Criterio: {item.category}
                          </span>
                          <span className="text-slate-800 font-medium">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

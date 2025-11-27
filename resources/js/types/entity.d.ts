export interface ActiveLogs {
    id: number;
    acao: string;
    user_id: number;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface Computers {
    id: number;
    nome: string;
    processador: string;
    memoria_ram_gb: number;
    armazenamento_gb: number;
    sistema_operacional: string;
    status: string;
    observacoes?: string | null;
    created_at?: string | null;
    updated_at?: string | null;

    hardware_components?: HardwareComponents[];
    maintenance_records?: MaintenanceRecords[];
    software?: Software[];
    locations: Locations;
};

export interface HardwareComponents {
    id: number;
    computer_id: number;
    tipo: string;
    modelo: string;
    capacidade?: number | null;
    status: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface Locations {
    id: number;
    nome: string;
    descricao: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface MaintenanceRecords {
    id: number;
    computer_id: number;
    user_id: number;
    tipo: string;
    descricao: string;
    proxima_revisao: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface QrCodes {
    id: number;
    roles_id: number;
    is_active: boolean;
    created_at?: string | null;
    updated_at?: string | null;
    computer_id: number;
};

export interface RolesQrCodes {
    id: number;
    tipo: string;
    descricao: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface RolesUsers {
    id: number;
    nome: string;
    descricao: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface Software {
    id: number;
    computer_id: number;
    nome: string;
    observacoes: string;
    created_at?: string | null;
    updated_at?: string | null;
};

export interface Users {
    id: number;
    name: string;
    email: string;
    created_at?: string | null;
    updated_at?: string | null;
    roles_id: number;
    role: RolesUsers
};

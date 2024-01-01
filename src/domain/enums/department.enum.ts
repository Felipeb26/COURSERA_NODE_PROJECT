export enum departments {
    GENERAL_DENTISTRY = "General Dentistry",
    PEDIATRIC_DENTISTRY = "Pediatric Dentistry",
    RESTORATIVE_DENTISTRY = "Restorative Dentistry",
    SURGERY = "Surgery",
    ORTHODONTICS = "Orthodontics"
}

export type DEPARTMENTS = typeof departments

export type DepartmentKeys = keyof DEPARTMENTS

export type DepartmentsValues = (typeof departments)[DepartmentKeys]


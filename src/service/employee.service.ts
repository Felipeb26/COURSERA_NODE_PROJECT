
interface CrudService<T> {
    findAll(): any
    findById(id: number | string): any
    post(body: T): any
    update(id: number | string, body: T): any
    deleteById(id: number): any
}
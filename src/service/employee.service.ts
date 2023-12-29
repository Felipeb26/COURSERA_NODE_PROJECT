
interface CrudService<T> {
    findAll(): Promise<Array<T>>
    findById(id: Number): Promise<T>
    post(body: T): Promise<T>
    update(id: Number, body: T): Promise<T>
    deleteById(id: Number): Promise<void>
}
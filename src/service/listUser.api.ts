import Store, { IStore } from 'store'

import {ICreateUserDTO} from "module/Home/DTO/createuser.dao"
import {IListUserDAO} from "module/Home/DAO/listUser.dao"
import {IRequestDAO} from "module/Home/DAO/request.dao"
import { UseBaseQueryOptions } from '@tanstack/react-query'
import instance from './interceptor';

export async function GetListUserAPI(
    params: UseBaseQueryOptions 
): Promise<IRequestDAO<IListUserDAO[]>> {
     const [
    // eslint-disable-next-line no-unused-vars
    _queryKey,
    page,
    size,
  ] = params.queryKey || []
    const { auth }: IStore = Store.getState()
    const { data } = await instance.get("/users?", { 
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + auth?.token,
        },
        params: {
            page: page || 1,
            per_page: size || 10,
        }
    });
    return data;
}

export async function CreateUserAPI(
    params: ICreateUserDTO
){
    const { data } = await instance.post("/users", params)
    return data
}
export async function UpdateUserAPI(
    params: any
){
    const { data } = await instance.put(`/users/${params?.id}`, {
    name: params.name,
    job: params.job
    })
    return data
}
export async function DeleteUserAPI(
    params: IListUserDAO
){
    // const { auth }: IStore = Store.getState()
    const { data } = await instance.delete(`/users/${params}`)
    return data
}
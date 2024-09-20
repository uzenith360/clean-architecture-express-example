import { IRouterMatcher, Router } from "express";
import httpMethods from "./http-methods.enum";

export default (
    router: Router,
    method: httpMethods,
): IRouterMatcher<Router> => (
    {
        [httpMethods.GET]: router.get,
        [httpMethods.PATCH]: router.patch,
        [httpMethods.POST]: router.post,
        [httpMethods.PUT]: router.put,
        [httpMethods.DELETE]: router.delete
    }[method] ?? router.get
).bind(router);

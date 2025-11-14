import { Router } from "express";
import userRouter from "./api.user.js";
import prodRouter from "./api.products.js";
import cartsRouter from "./api.cart.js";
import routeremail from "./api.email.js";
import contactRouter from "./api.contact.js";
import orderRouter from "./api.order.js";
import subscriptionRouter from "./api.suscrip.js";
import passwordRouter from "./api.password.js";

const apiRouter = Router();

apiRouter.use("/products", prodRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/carts", cartsRouter)
apiRouter.use("/emails", routeremail)
apiRouter.use("/contact", contactRouter)
apiRouter.use("/order", orderRouter)
apiRouter.use("/subscription", subscriptionRouter)
apiRouter.use("/password", passwordRouter)


export default apiRouter
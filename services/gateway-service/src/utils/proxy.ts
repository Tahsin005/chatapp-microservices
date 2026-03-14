import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

export const createServiceProxy = (target: string, basePath: string) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${basePath}`]: "",
        },
        onProxyReq: (proxyReq, req, _res) => {
            fixRequestBody(proxyReq, req);
            console.log(`[Gateway] ${req.method} ${req.originalUrl} -> ${target}`);
        },
        onError: (err, _req, res) => {
            res.status(500).json({
                message: "Gateway Error",
                error: err.message,
            });
        },
    });
};
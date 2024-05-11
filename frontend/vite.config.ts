import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        plugins: [react()],
        server: {
            port: process.env.VITE_LOCAL_FRONTEND_SERVER_PORT
                ? parseInt(process.env.VITE_LOCAL_FRONTEND_SERVER_PORT, 10)
                : undefined,
        },
    };
});

export const config = {
    MAIN_SERVER_URL: process.env.NEXT_PUBLIC_MAIN_SERVER_URL || "http://localhost:4000",
    SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:9002",
    CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
    PROXY_BASE_URL: process.env.NEXT_PUBLIC_PROXY_BASE_URL || "localhost:7000"
};

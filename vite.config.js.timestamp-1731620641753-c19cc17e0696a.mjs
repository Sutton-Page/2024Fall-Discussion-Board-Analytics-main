// vite.config.js
import { defineConfig } from "file:///E:/2024Fall-Discussion-Board-Analytics/node_modules/vite/dist/node/index.js";
import react from "file:///E:/2024Fall-Discussion-Board-Analytics/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///E:/2024Fall-Discussion-Board-Analytics/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.SPRING_PORT}`,
        // Spring Boot server
        changeOrigin: true,
        secure: false
      },
      "/flask": {
        target: `http://localhost:${process.env.FLASK_PORT}`,
        // Flask server
        changeOrigin: true,
        secure: false
      },
      "/data": {
        target: `http://localhost:${process.env.BACKEND_PORT}`,
        // Node server (server.cjs)
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFwyMDI0RmFsbC1EaXNjdXNzaW9uLUJvYXJkLUFuYWx5dGljc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcMjAyNEZhbGwtRGlzY3Vzc2lvbi1Cb2FyZC1BbmFseXRpY3NcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LzIwMjRGYWxsLURpc2N1c3Npb24tQm9hcmQtQW5hbHl0aWNzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudidcclxuXHJcbmRvdGVudi5jb25maWcoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaSc6IHtcclxuICAgICAgICB0YXJnZXQ6IGBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuU1BSSU5HX1BPUlR9YCwgIC8vIFNwcmluZyBCb290IHNlcnZlclxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICAnL2ZsYXNrJzoge1xyXG4gICAgICAgIHRhcmdldDogYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5GTEFTS19QT1JUfWAsICAvLyBGbGFzayBzZXJ2ZXJcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgJy9kYXRhJzoge1xyXG4gICAgICAgIHRhcmdldDogYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5CQUNLRU5EX1BPUlR9YCwgIC8vIE5vZGUgc2VydmVyIChzZXJ2ZXIuY2pzKVxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdTLFNBQVMsb0JBQW9CO0FBQ3JVLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFFbkIsT0FBTyxPQUFPO0FBRWQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVEsb0JBQW9CLFFBQVEsSUFBSSxXQUFXO0FBQUE7QUFBQSxRQUNuRCxjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsUUFBUSxvQkFBb0IsUUFBUSxJQUFJLFVBQVU7QUFBQTtBQUFBLFFBQ2xELGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxRQUFRLG9CQUFvQixRQUFRLElBQUksWUFBWTtBQUFBO0FBQUEsUUFDcEQsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

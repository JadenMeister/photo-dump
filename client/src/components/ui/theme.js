
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({

  preflight: false,   // CSS 리셋 완전 비활성화
  globalCss: false,   // Chakra의 전역스타일(globalCss)도 완전 비활성화

  theme: {
    components: {
      Dialog: {
        baseStyle: {
          positioner: {
            w: "100vw",
            h: "100vh",
          },
          content: {
            bg: "gray.900",
            w: "100vw",
            h: "100vh",
            borderRadius: "20px",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

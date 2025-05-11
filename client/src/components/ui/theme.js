import{createSystem, defaultConfig} from "@chakra-ui/react";




export const system = createSystem(defaultConfig,{
  preflight: false,
  components:{
    Dialog:{
      baseStyle:{
        content:{
          maxW:"100vw",
          maxH:"90vh",
          bg:"white",

        }
      }
    }
  }
})



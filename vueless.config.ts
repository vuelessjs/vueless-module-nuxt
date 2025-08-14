import { componentConfigs } from './.vueless'

export default {
  colorMode: 'auto',
  runtimeColors: true,
  components: {
    ...componentConfigs,
    UHeader: {
      // header: 'font-bold',
    },
  },
}

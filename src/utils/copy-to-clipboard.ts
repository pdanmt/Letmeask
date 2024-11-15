import { CustomizedToast } from "../components/customized-toast"

export function CopyTextToClipboard(code?: string) {
    if (code) {
       navigator.clipboard.writeText(code)
       CustomizedToast({ isSucess: true, text: 'Código da sala copiado!' })
    }
}
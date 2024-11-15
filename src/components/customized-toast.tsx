import { toast } from "sonner";

interface CustomizedToastProps {
    text: string
    isSucess: boolean
}

export function CustomizedToast({ text, isSucess }: CustomizedToastProps) {
    if (isSucess) {
        toast.success(text, { style: { padding: '1rem' } })
    } else {
        toast.error(text, { style: { padding: '1rem' } })
    }
}
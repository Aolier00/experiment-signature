import { AppContext, AppContextType } from '@/containers/AppContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react'


export const useUpload = () => {
const router = useRouter();

    const { setFile, file } = useContext(AppContext) as AppContextType;
    const uploadFile = (e: any) => {
        const file = e.target.files[0];
        setFile(file);
    };

    useEffect(() => {
        if (!file) return;
        router.push('/signature')
    }, [file]);


    return { file, uploadFile }
}
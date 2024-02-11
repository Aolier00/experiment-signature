import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

export type AppContextType = {
    file: File | null,
    setFile: Dispatch<SetStateAction<File | null>>
}

export const AppContext = createContext<AppContextType | null>(null);


type Props = {
    children: ReactNode
}

export function AppContextProvider({ children }: Props): JSX.Element {
    const [file, setFile] = useState<File | null>(null);

   
    return (
        <AppContext.Provider
            value={{
                file,
                setFile
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
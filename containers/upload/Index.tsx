import { useUpload } from './hooks/useUpload'

const Index = () => {
    const { uploadFile } = useUpload();
    return (
        <main className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='w-9/12 mb-2'>
                <h1 className='text-left'>Upload Document</h1>
            </div>
            <div className='w-9/12 h-52 bg-gray-800 rounded-lg shadow-sm relative flex justify-center items-center'>
                <input
                    type="file"
                    name="file"
                    className='drop-file text-gray-800 absolute h-full w-full'
                    accept=".pdf, .jpg"
                    onChange={uploadFile}
                />
                <button className='absolute bg-gray-900 p-2 rounded-lg shadow-lg text-neutral-400'>Add Document</button>
            </div>
        </main >
    )
}

export default Index
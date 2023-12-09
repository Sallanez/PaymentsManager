const Loading = () => {
  return (
    <div className='flex justify-end max-w-full p-10 overflow-hidden'>
        <div className='flex items-center h-screen pb-20 mx-auto'>
            <span className="loading loading-spinner loading-lg"></span>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default Loading
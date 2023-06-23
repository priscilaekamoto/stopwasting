
export default function BotaoRemover({onClickRemover, idItem}) {

    function handleClick() {
        onClickRemover(idItem);
    }
    return(
            <>
                <button onClick={handleClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">
                    Remover
                </button>
            </>
    ) 
}
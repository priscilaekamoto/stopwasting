
export default function BotaoRemover({onClickRemover, idItem}) {

    function handleClick() {
        console.log(idItem)
        onClickRemover(idItem);
    }
    return(
        <div>
            <button onClick={handleClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remover
            </button>
        </div>
    ) 
}
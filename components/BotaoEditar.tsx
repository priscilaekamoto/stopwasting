
export default function BotaoEditar({onClickEditar, idItem}) {

    function handleClick() {        
        onClickEditar(idItem);
    }
    return(
            <>
                <button onClick={handleClick} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-block">
                    Editar
                </button>
            </>
    ) 
}
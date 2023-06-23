export function ConverterDataAmericanaParaBrasileira(dataAmericana) {
    const partes = dataAmericana.split('-');
    if (partes.length !== 3) {
      throw new Error('Formato de data americana inválido');
    }
    
    const [ano, mes, dia] = partes;
    
    const dataBrasileira = `${dia}/${mes}/${ano}`;
    return dataBrasileira;
}

export function ConverterDataBrasileiraAmericana(dataBrasileira) {
  const partes = dataBrasileira.split('/');
  if (partes.length !== 3) {
    throw new Error('Formato de data brasileira inválido');
  }
  
  const [dia, mes, ano] = partes;
  
  const dataAmericana = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  return dataAmericana;
}

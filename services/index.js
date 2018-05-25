const EmpresasJSON = require('../empresas-filhas.json');
const _ = require('lodash');
const fs = require('fs');
const csv = require('fast-csv');
// const csv = require('csv');

let empresa = {
  razao_social: '',
  nome: '',
  logo: '',
  fundada_em: new Date(),
  descricao: '',
  cnpj: '',
  email: '',
  qtde_funcionarios: 0,
  modelo_de_negocio: '',
  estagio_do_produto: '',
  investidor: '',
  faturamento: 0,
  estagio_de_financiamento: '',
  incubacao: '',
  website: '',
  cep: '',
  logradouro: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  ativada: false,
  aprovado: false,
  propriede_intelectual: false,
  colaboracao: false,
  spinoff: false,
  area_de_atuacao: [],
  telefone: '',
  facebook: '',
  twitter: '',
  linkedin: '',
  instagram: '',
  complemento: '',
  github: ''
}
module.exports = {
  createEmpresa() {
    const verifyGraduada = item => item.graduada === 'f' ? 'não' : 'graduada';
    let newEmpresasJSON = [];
    let newEmpresaExcel = [];
    EmpresasJSON.forEach(item => {
      empresa.razao_social = item.razao_social;
      empresa.nome = item.nome_fantasia;
      empresa.website = item.site;
      empresa.incubacao = item.incubada === 'f' ? verifyGraduada(item) : 'incubada';
      empresa.fundada_em = new Date(item.ano_fundacao, 1, 1);
      empresa.qtde_funcionarios = item.numero_funcionarios;
      empresa.linkedin = item.url_linkedin;
      empresa.area_de_atuacao = item.areas.map(area => area.area_atuacao);
      empresa.descricao = item.descricao;
      newEmpresasJSON.push(empresa);
    });
    let array = [];
    fs.createReadStream("TabelaGeral-empresas-filhas2017.csv")
      .pipe(csv())
      .on('data', data => {
        array.push(data)
      })
      .on('end', () => {
        console.log(array[0].map(item => item))
        console.log('Acabou!!')
      })
    // console.log(csv.parse(table))
    // // csv.each(table)
    // //   .on('data', function (data) {
    // //     console.log(data)
    // //   }).on('end', function () {
    // //     console.log('Finished');
    // //   })
    return array
  }
}

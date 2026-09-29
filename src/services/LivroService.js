const LivroRepository = require('../repositories/LivroRepository');
const CategoriaRepository = require('../repositories/CategoriaRepository');
const { sequelize, Emprestimo } = require('../models');

class LivroService {
    async BuscarTodos(filtros) {
        return await LivroRepository.BuscarTodos(filtros);
    }

    async BuscarPorId(id) {
        const BuscaDeId = await LivroRepository.BuscarPorId(id);
        if (!BuscaDeId) {
            throw new Error("Livro não encontrado!");
        } else {
            return BuscaDeId;
        }
    }
    async AssociarCategoria(livroId, categoriaId) {
        const livro = await LivroRepository.BuscarPorId(livroId);
        const categoria = await CategoriaRepository.BuscarPorId(categoriaId);
        if (!livro) {
            throw new Error("Livro não encontrado!");
        } else if (!categoria) {
            throw new Error("Categoria não encontrada!");
        } else {
            await livro.addCategoria(categoria);
            return {
                message: "Categoria associada ao livro com sucesso!"
            };
        }

    }
    async Criar(livro) {
        if (!livro.titulo || !livro.isbn || !livro.ano || !livro.autorId) {
            throw new Error("Título, ISBN, ano e autor são obrigatórios!");
        } else {
            return await LivroRepository.Criar(livro);
        }
    }

    async Atualizar(id, livro) {
        return await LivroRepository.Atualizar(id, livro);
    }

    async deletar(id) {
        return await LivroRepository.deletar(id);
    }
    async emprestar(id) {
        const t = await sequelize.transaction();
        try {
            const livro = await LivroRepository.BuscarPorId(id);
            if (!livro) {
                throw new Error("Livro não encontrado!");
            }
            if (!livro.disponivel) {
                throw new Error("Este livro já está emprestado!");
            }
            await livro.update({ disponivel: false }, { transaction: t });
            await Emprestimo.create({
                livroId: id,
                dataEmprestimo: new Date()
            }, { transaction: t });
            await t.commit();
            return { mensagem: "Empréstimo realizado com sucesso!" };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async devolver(id) {
        const t = await sequelize.transaction();
        try {
            const livro = await LivroRepository.BuscarPorId(id);
            if (!livro) {
                throw new Error("Livro não encontrado!");
            }

            if (livro.disponivel) {
                throw new Error("Este livro já está na biblioteca (disponível)!");
            }

            const emprestimoAberto = await Emprestimo.findOne({
                where: {
                    livroId: id,
                    dataDevolucao: null
                },
                transaction: t
            });

            if (!emprestimoAberto) {
                throw new Error("Nenhum empréstimo em aberto encontrado para este livro!");
            }

            await livro.update({ disponivel: true }, { transaction: t });

            await emprestimoAberto.update({ dataDevolucao: new Date() }, { transaction: t });

            await t.commit();
            return { mensagem: "Livro devolvido com sucesso!" };

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}
module.exports = new LivroService();

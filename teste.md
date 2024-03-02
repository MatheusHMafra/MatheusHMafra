-- 3. Criação das queries

-- a. Apresentar todos os clientes em ordem alfabética;
SELECT * FROM Cliente ORDER BY Nome;

-- b. Torne a coluna Telefone como não nula e única.
ALTER TABLE Cliente 
ALTER COLUMN Telefone SET NOT NULL,
ADD CONSTRAINT unique_telefone UNIQUE (Telefone);

-- c. Apresentar os itens do cardápio que não contêm “queijo”;
SELECT * FROM Item_Cardapio WHERE LOWER(Nome) NOT LIKE '%queijo%';

-- d. Exibir todos os pedidos, incluindo os nomes dos respectivos clientes;
SELECT Pedido.*, Cliente.Nome AS Nome_Cliente 
FROM Pedido 
INNER JOIN Cliente ON Pedido.ID_Cliente = Cliente.ID_Cliente;

-- e. Delete o pedido número 5.
DELETE FROM Pedido WHERE ID_Pedido = 5;

-- f. Calcular a idade de cada cliente e apresentá-los de forma crescente.
SELECT *, EXTRACT(YEAR FROM AGE(NOW(), Data_Nasc)) AS idade FROM Cliente ORDER BY idade;

-- g. Excluir clientes menores de 18 anos.
DELETE FROM Cliente WHERE EXTRACT(YEAR FROM AGE(NOW(), Data_Nasc)) < 18;

-- h. Crie a coluna Data_Cadastro na tabela Cliente, usando como valor Default a data atual.
ALTER TABLE Cliente ADD COLUMN Data_Cadastro DATE DEFAULT CURRENT_DATE;

-- i. Crie a coluna "Gluten_Free" e "Is_Vegano" na tabela "Item_Cardapio", defina ambas as colunas como False.
ALTER TABLE Item_Cardapio ADD COLUMN Gluten_Free BOOLEAN DEFAULT FALSE;
ALTER TABLE Item_Cardapio ADD COLUMN Is_Vegano BOOLEAN DEFAULT FALSE;

-- j. Apresente os pedidos, os respectivos clientes, nome do item pedido, a quantidade total deste item e o valor total. O resultado deve ser ordenado pelo número do pedido.
SELECT Pedido.ID_Pedido, Cliente.Nome AS Nome_Cliente, Item_Cardapio.Nome AS Nome_Item, 
SUM(Item_Pedido.quantidade) AS Quantidade_Total, SUM(Item_Pedido.quantidade * Item_Cardapio.Preco) AS Valor_Total
FROM Pedido
INNER JOIN Cliente ON Pedido.ID_Cliente = Cliente.ID_Cliente
INNER JOIN Item_Pedido ON Pedido.ID_Pedido = Item_Pedido.ID_Pedido
INNER JOIN Item_Cardapio ON Item_Pedido.ID_Item = Item_Cardapio.ID_Item
GROUP BY Pedido.ID_Pedido, Cliente.Nome, Item_Cardapio.Nome
ORDER BY Pedido.ID_Pedido;

-- k. Altere o nome da coluna "Data_Cadastro" da tabela "Cliente" para "Dt_Cadastro".
ALTER TABLE Cliente RENAME COLUMN Data_Cadastro TO Dt_Cadastro;

-- l. Atualizar o campo “Total” da tabela “Pedido”, com base no valor dos itens do pedido multiplicados pela quantidade.
UPDATE Pedido
SET Total = subquery.total_pedido
FROM (
    SELECT ID_Pedido, SUM(quantidade * preco) AS total_pedido
    FROM Item_Pedido
    INNER JOIN Item_Cardapio ON Item_Pedido.ID_Item = Item_Cardapio.ID_Item
    GROUP BY ID_Pedido
) AS subquery
WHERE Pedido.ID_Pedido = subquery.ID_Pedido;

-- m. Apresentar o número de pedidos de cada cliente, apresentando os atributos código do cliente, nome do cliente, número de pedidos e o valor total dos pedidos. Apresente o resultado ordenado decrescente por gastos.
SELECT Cliente.ID_Cliente, Cliente.Nome, COUNT(Pedido.ID_Pedido) AS Numero_Pedidos, SUM(Pedido.Total) AS Valor_Total_Pedidos
FROM Cliente
LEFT JOIN Pedido ON Cliente.ID_Cliente = Pedido.ID_Cliente
GROUP BY Cliente.ID_Cliente
ORDER BY Valor_Total_Pedidos DESC;

-- n. Listar todos os itens de cada Pedido, incluindo o nome do item e a quantidade.
SELECT Pedido.ID_Pedido, Item_Cardapio.Nome AS Nome_Item, Item_Pedido.quantidade
FROM Pedido
INNER JOIN Item_Pedido ON Pedido.ID_Pedido = Item_Pedido.ID_Pedido
INNER JOIN Item_Cardapio ON Item_Pedido.ID_Item = Item_Cardapio.ID_Item
ORDER BY Pedido.ID_Pedido;

-- o. Apresentar os clientes que fizeram mais de 1 pedido, mostrando o número total de pedidos e o valor total correspondente
SELECT Cliente.ID_Cliente, Cliente.Nome, COUNT(Pedido.ID_Pedido) AS Numero_Pedidos, SUM(Pedido.Total) AS Valor_Total_Pedidos
FROM Cliente
INNER JOIN Pedido ON Cliente.ID_Cliente = Pedido.ID_Cliente
GROUP BY Cliente.ID_Cliente
HAVING COUNT(Pedido.ID_Pedido) > 1;
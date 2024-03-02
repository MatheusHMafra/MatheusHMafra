-- 4. Criação da View VisaoDetalhesPedidos

CREATE VIEW VisaoDetalhesPedidos AS
SELECT Cliente.Nome AS Nome_Cliente, Pedido.DataHora AS Data_Hora, Pedido.Total AS Total,
       Item_Cardapio.Nome AS Item, Item_Pedido.quantidade AS Quantidade
FROM Pedido
INNER JOIN Cliente ON Pedido.ID_Cliente = Cliente.ID_Cliente
INNER JOIN Item_Pedido ON Pedido.ID_Pedido = Item_Pedido.ID_Pedido
INNER JOIN Item_Cardapio ON Item_Pedido.ID_Item = Item_Cardapio.ID_Item;
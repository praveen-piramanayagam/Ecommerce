<!-- Task Explaination -->
-- Initial basic Nav bar,Header,body and footer is structured.
-- The data from fakestoreapi is fetched and converted to json format.And displayed with the function displayProducts(products).
-- In the function initially grid div innerhtml is set to be empty and HTML elements are created and values from json is assigned to it and function is called to display API.
-- when User clicks buy button a modal is displayed with product description and product price and quantity.
-- When user increases quantity according to that price will also changes dynamically.
-- When user clicks close button in modal the pop-up is closed.
-- In the searchbar initially input eventlistner is added to verify any input is happening 
-- All entered value is converted into lowercase to avoid mismatch with uppercase and lowercase.
-- the entered value is filtered within all product title alone and will be displayed.
-- When user clicks add to cart button array of selected products is pushed as array objects.
-- The modal for cart is manipulated using DOM and when user clicks view cart button display function is called.
-- In the cart if array value is equals to zero it will show as empty.
-- If array has values it will display values as DOM structure for each array objects.
-- After checking out an alert box will be displayed.
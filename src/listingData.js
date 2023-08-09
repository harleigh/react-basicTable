//every begining has a begining, and this is this begining. And, being that
//this is the begining, take it with a grain of salt as there is quite a road
//yet being paved; as I am learning, all code and documentation are "as is"


import { useState } from 'react';

//data for this practice program
const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];


/**
 * This is the category of the products, e.g. "Fruit"
 * <tr> is a table row
 * <th> is a table header (e.g. Fruits)
 * 
 * In: One product (with fields category price stocked name)
 * returns: A table row that spans two columns and displays
 * the product's category name
 */
function ProductCategoryRow({product}){
    return(
        <tr>
            <th colSpan={2}>
                {product.category}
            </th>
        </tr>
    );
}//end product row


/**
 * A product element row is a produce name and its price. If it's
 * out of stock, the text-color should be changed to red
 * 
 * In: One product (with fields category price stocked name)
 * returns: A table row that contains the product's name and price 
 */
function ProductElementRow({product}) {
    let  elementName = product.name;
    if(!product.stocked){
        elementName = <span style={{color: "red"}}>{product.name}</span>
    }

    return(
        <tr>
            <td>
                {elementName}
            </td>
            <td>
                {product.price}
            </td>
        </tr>
    )
}//end product element row


/**
 * The main table of the products, which puts together the category rows
 * as well as the element rows. And, this table filters the resutls of the
 * products based on any filter-text as well as whether a flag was raised
 * to only show products in stock
 * 
 * In:  productManifest--an array of products
 *      filter: the text used to filter the results of the products
 *      showOnlyInStock: flag whether we show all products or only 
 *                       those that are in stock.
 * Returns: One Table of products with appropriate filtering
 */
function ProductTable({productManifest, filter, showOnlyInStock}) {
    const tableRows = []
    let prevCategory = null
    console.log(productManifest)

    productManifest.forEach( (entry) => {

        //see if we need to filter out an entry if it's not in stock
        if (showOnlyInStock && !entry.stocked) {
            return;
        }
        //see if we need to filter out any results from the search
        if(entry.name.toLowerCase().indexOf( filter.toLowerCase() )===-1){
            return;
        }

        //check if we have a new category, if so, add this new
        //category and update the previously seen category
        if(entry.category !== prevCategory){
            tableRows.push( <ProductCategoryRow product={entry}
                                                key={entry.category}>
                            </ProductCategoryRow>);
            prevCategory = entry.category;
        }
        //Now we know we have an element of the produce table, so
        //we add it to the table
        tableRows.push( <ProductElementRow product={entry}
                                               key={entry.name}>
                        </ProductElementRow>);
    });//end forEach

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </table>
    );
}//end product table component

/**
 * In:  filter--the text that filters the results of the products
 *      showOnlyInStock--a flag stating whether to show only in stock products
 *      onFilterChange--state handler that will modify the react component (so)
 *                      text is updated in the filter-bar when user types
 *      onShowOnlyInStockChange--similar to the onFilterChange; handeler that
 *              refreshes the component when the user clicks the checkbox
 */
function SearchBar({filter, showOnlyInStock, onFilterChange,
                                                    onShowOnlyInStockChange}){

    /* 
        note: "onChange" fills in the "event" parameter, event.target.value is
        the filter text, and event.target.checked is whether the check-box is
        checked
     */
    return(
        <form>
            <input  type="search"
                    value={filter}
                    placeholder="Search..."
                    onChange={(event) => onFilterChange(event.target.value)}/>
            <label>
                <input  type="checkbox" 
                        checked={showOnlyInStock} 
                        onChange={
                          (event) =>
                          onShowOnlyInStockChange(event.target.checked)} />
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}// end search bar


/**
 * This builds the product table that has the filtering functionality.
 * State filterText is the text that the user enters into the filter-text
 * box to filter the products. And, inStockOnly is the state that represents
 * whether the check-box has been clicked to only show products in stock.
 * Both of these and their set-functions are fed into the Search Bar. The 
 * Search Bar takes care of calling the set-methods.
 * */
function FilterableProductTable({productManifest}){
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    return (
        <div>
            <SearchBar filter={filterText}
                       showOnlyInStock={inStockOnly}
                       onFilterChange={setFilterText}
                       onShowOnlyInStockChange={setInStockOnly}/>

            <ProductTable productManifest={PRODUCTS}
                          filter={filterText}
                          showOnlyInStock={inStockOnly}/>
        </div>
    );
}// end the filtered produce table


//"export default"  makes this the main component in the file.
//returns a component that contains the filter table
export default function ProduceManager() {

    return (
        <>
        <h1>Herbert's Produce</h1>
           <FilterableProductTable productManifest={PRODUCTS}/>
        </>
    );

}// end main function


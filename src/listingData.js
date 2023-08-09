//every begining has a begining, and this is this begining. And, being that
//this is the begining, take it with a grain of salt as there is quite a road
//yet being paved; as I am learning, all code and documentation are "as is"


import { useState } from 'react';

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
  ];


/**
 * 
 * <tr> is a table row
 * <th> is a table header (e.g. Fruits)
 * @param {*} product 
 * @returns 
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
}

function ProductTable({productManifest, filter, showOnlyInStock}) {
    const tableRows = []
    let prevCategory = null
    console.log(productManifest)

    productManifest.forEach( (entry) => {
        if (showOnlyInStock && !entry.stocked) {
            return;
          }
        if(entry.category !== prevCategory){
            tableRows.push( <ProductCategoryRow product={entry}
                                                key={entry.category}>
                            </ProductCategoryRow>);
        }
        prevCategory = entry.category;
        tableRows.push( <ProductElementRow product={entry}
                                               key={entry.name}>
                        </ProductElementRow>);
    });

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
}


function SearchBar({filter, showOnlyInStock, onFilterChange, onShowOnlyInStockChange}){
    return(
        <form>
            <input  type="search"
                    value={filter}
                    placeholder="Search..."
                    onChange={(e) => onFilterChange(e.target.value)}/>
            <label>
                <input  type="checkbox" 
                        checked={showOnlyInStock} 
                        onChange={(e) => onShowOnlyInStockChange(e.target.checked)} />
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}


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
}


//"export default"  makes this the main component in the file.
//returns a component
export default function ProduceManager() {

    return (
        <>
        <h1>Herbert's Produce</h1>
           <FilterableProductTable productManifest={PRODUCTS}/>
        </>
    );

}// end main function


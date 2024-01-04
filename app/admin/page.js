import React from 'react';
import AddProductComponent from 'app/ui/addproduct';
import DeleteProductComponent from 'app/ui/deleteproduct';
import UpdateProductComponent from 'app/ui/updateproduct';
import SearchComponent from 'app/ui/SearchComponent';
import AllItemsComponent from 'app/ui/AllItemsComponent';

function Page() {
  return (
    <div className="admin-page">
      <h2 className="admin-header">Admin Page</h2>
      <div className="admin-container">
        <div className="admin-component">
          <AddProductComponent />
        </div>
        <div className="admin-component">
          <DeleteProductComponent />
        </div>
        <div className="admin-component">
          <UpdateProductComponent />
        </div>
      </div>
      <h2>Search Product</h2>
      <SearchComponent />
      <h2>Listed Product</h2>
      <AllItemsComponent />
    </div>
  );
}

export default Page;
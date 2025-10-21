# Stackline Full Stack Assignment
---

Hello Stackline Engineering Team! 👋

For each fix in this project, I have marked them directly in the source files using comment.  
These comments follow this format:
```text
// Fix Bug [number]: [short description]
```
---

## Fix & Improvement
### A. Product Data and Loading Fixes
#### Bug 1: Product data is passed in query
The product page used to read the full product object from the URL query.  
This made the URL very long, easy to break, and unsafe because users could change data in the address bar.

**Before:**
```text
http://localhost:3000/product?product=%7B%22stacklineSku%22%3A%22E8ZVY2BP3%22%2C%22....categoryId%22%3A1702%2C%22subCategoryName%22%3A%22E-Readers%22%7D
```

**After:**
```text
http://localhost:3000/product?sku=E8ZVY2BP3
```

**Fix** 
- [Commit](https://github.com/Stackline-Engineering/fullstack-assessment/commit/f18d81e3783dd794f5c68f11b842a988462718cf)
- Changed it to only pass the product SKU in the URL.  
- Fetched the product details from the API using that SKU.

**Reason**
This makes the page more secure, the URL cleaner and the data always fresh from the server.

---
#### Bug 2: “Product not found” showing before loading
After adding the above fix by fetching product sku from API, when opening a product, the page showed “Product not found” before the data finished loading.

**Fix**
- [Commits](https://github.com/Stackline-Engineering/fullstack-assessment/commit/f18d81e3783dd794f5c68f11b842a988462718cf)
- Added a clear loading state while fetching the product.  
- Display the "loading"/ "product not found" page accordingly.
<img width="1341" height="433" alt="Screenshot 2025-10-20 at 5 00 23 PM" src="https://github.com/user-attachments/assets/39804e43-c80c-4fe2-9cdb-fd70ab55d935" />

**Reason**
This gives a smoother user experience and avoids wrong error messages. Now users see a proper loading screen, no flickering, and no console errors.

### B. Subcategory Filter Fixes
#### Bug 3: Subcategories not linked to selected category
The subcategories were fetched without using the selected category. This caused unrelated subcategories to show up or the wrong list to appear.

**Before:**
![filterexample](https://github.com/user-attachments/assets/55329c2c-15d9-4fc6-bf1f-4ee3c0e4c5d5)

**After:**
<img width="1313" height="668" alt="Screenshot 2025-10-20 at 5 02 36 PM" src="https://github.com/user-attachments/assets/289e2a72-f2ca-407d-806c-e1f121b47943" />

**Fix**
- [Commit](https://github.com/Stackline-Engineering/fullstack-assessment/commit/1ec738ca5122297e4604179bd6b1ee078b6906b7)
- Used the selected category as a query parameter when fetching subcategories

**Reason**
Before, the API fetched all subcategories regardless of the selected category.
By adding the category as a query parameter, the subcategory list now shows only related items. Subcategories correctly match the chosen category. Improves usability and reduces confusion for users.

---
#### Bug 4: Subcategory not cleared after changing category
When switching categories, the previously selected subcategory stayed active. This caused empty product results 

**Before:**
![ScreenRecording2025-10-18at12 45 19PM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/a8fb1a47-da52-42ce-bca2-c95ba345ab3a)

**After:**
![502900319-522fdb19-d941-41ba-b308-f436a8a16a58-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/451806bf-3c60-4e16-84cf-863032104e63)

**Fix**  
- [Commits](https://github.com/Stackline-Engineering/fullstack-assessment/commit/295f28124d1693833cb85264128da425628d9db3)
- Automatically clear the selected subcategory whenever the user changes the category  

**Reason**
Keeping the old subcategory caused invalid filter combinations (e.g. a subcategory from a different category). Resetting it ensures that filters always stay consistent with the selected category. This prevents empty or incorrect product results and provides a smoother and more intuitive user experience.

---
#### Bug 5: Category filter not resetting when clicking "Clear Filter"
After clicking **Clear Filters**, the category dropdown still showed the previously selected category instead of resetting to the default “All Categories” state.

**Before:**
![ScreenRecording2025-10-18at12 46 14PM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/a2fddae5-eaa6-4626-8f4d-bcf51ed46a58)

**After:**
![502900285-cfa64943-02fe-4c4c-9aae-e5d13135f6d2-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/dd50afc3-c59a-4888-b110-03f480006c4d)


**Fix**  
- [Commits](https://github.com/Stackline-Engineering/fullstack-assessment/commit/295f28124d1693833cb85264128da425628d9db3)
- Reset both category and subcategory states when the **Clear Filters** button is clicked:  

**Reason**
The previous implementation only cleared the search text but did not reset the dropdown states.
By explicitly resetting both selectedCategory and selectedSubCategory, the filters now properly return to their default state. The filter UI correctly resets to "All Categories", prevents confusion when clearing filters, and provides a consistent experience for users.
   
---
### C. Error in image loading
#### Bug 6: Next Image blocked remote host
Product images from Amazon did not render. The hostname in the error was `images-na.ssl-images-amazon.com`, but the config only allowed `m.media-amazon.com`.
<img width="967" height="192" alt="Screenshot 2025-10-17 at 11 14 27 PM" src="https://github.com/user-attachments/assets/a18c9fcd-2324-4e6b-9e96-7551e0309d92" />

**Fix**  
- [commits](https://github.com/Stackline-Engineering/fullstack-assessment/commit/122e70e2512b010241bc0603483964228af341c2) 
- Add the missing hostname to the images remotePatterns

**Reason**
Next.js restricts image sources to improve security. The missing hostname prevented Amazon images from loading. By adding the fix, product images now display correctly.

---

### D. Missing Error Handling in API Calls
#### Bug 7: No error handling for fetch requests
Several API calls used `fetch()` without checking response status or handling failures. If the request failed or returned an error, the app crashed or kept showing the loading spinner

**Fix** 
- [commit](https://github.com/Stackline-Engineering/fullstack-assessment/commit/0c33475cf713e648e8695e40e5686f26addb7577)
- Added simple error handling with `.then()` and `.catch()` to safely manage bad responses  

**Reason**
Without error handling, the app could break when the API returned an error.
Adding these checks can prevent crashes and infinite loading states and improve app stability and reliability.


## Future Improvement
Due to time constraints, some potential enhancements could not be implemented in this version. However, I have identified several areas for future improvement to enhance user experience.

### Improvement 1. Pagination with items per page
Users could not control how many products to see at once. There is no pagination, the page always loads 20 products.

**Possible Fix**
A page size selector controls how many items load each time. The request now uses limit and offset.
Let users choose smaller or larger batches. This reduces initial payload and keeps the UI responsive, and create a smoother list browsing and better user experience.

---

### Improvement 2. Load More button
The homepage only displayed 20 products. There is no continuous browsing of all products. Users had to view them by setting category filters.
**Possible Fix**
A Load More button appends the next set under the current list.


**Reason**
Appends new items without losing scroll position and avoids a full rerender of the grid.
Users can now continue browsing and improve their look-up experience.


class Book {
    constructor( course,homework,dedline){
        this.course =  course;
        this.homework = homework;
        this.dedline = dedline;
    }
}


class UI {
    static displayBooks(){
        let books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.course}</td>
            <td>${book.homework}</td>
            <td>${book.dedline}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
      }

    static saveBook(book){
        let books;
        books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(dedline){
        const books = Store.getBooks();

        books.forEach((book, index) => {
          if(book.dedline === dedline) {
            books.splice(index, 1);
          }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded',UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit',(e) => {

    e.preventDefault();

    const  course = document.querySelector('#course').value;
    const homework = document.querySelector('#homework').value;
    const dedline = document.querySelector('#dedline').value;

    if( course === '' || homework === '' || dedline === ''){
    } else {

        const book = new Book( course,homework,dedline);
        UI.addBookToList(book);

        Store.saveBook(book);
    }

});

document.querySelector('#book-list').addEventListener('click',(e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
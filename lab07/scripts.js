document.addEventListener("DOMContentLoaded", function () {
    // นำ ของรายการ To-Do มาเก็บไว้ในตัวแปร todoList
    const todoList = document.getElementById("todo-list");
    // นำ ของ Input To-Do มาเก็บไว้ในตัวแปร todoInput
    const todoInput = document.getElementById("todo-input");
    // นำ ของปุ่ม "เพิ่ม" มาเก็บไว้ในตัวแปร addButton
    const addButton = document.getElementById("add-button")
    // อาร์เรย์สำหรับเก็บรายการ To-Do
    let todos = [];

    // ฟังก์ชันสำหรับเพิ่มTo-Do
    function addTodo() {
        // ดึงข้อความจาก Input Element และตัดช่องว่างที่อยู่ท้ายสตริง
        const todoText = todoInput.value.trim();
        
        // ถ้าข้อความไม่ว่างเปล่า
        if (todoText !== "") {
            // สร้าง Object ใหม่เพื่อเก็บ To-Do
            const todoItem = {
                text: todoText,
                completed: false,
            };
            // เพิ่ม To-Do ลงในอาร์เรย์
            todos.push(todoItem);
            // เรียกฟังก์ชัน renderTodoList() เพื่ออัปเดตการแสดงผล
            renderTodoList();
            // ล้างค่าใน Input Element
            todoInput.value = "";
        }
    }

    function deleteTodo(index) {
        // ลบ To-Do ที่มีดัชนี index จากอาร์เรย์
        todos.splice(index, 1);
        // เรียกฟังก์ชัน renderTodoList() เพื่ออัปเดตการแสดงผล
        renderTodoList();
    }

    // ฟังก์ชันสำหรับตรวจสอบ/ยกเลิกการเสร็จสิ้น To-Do
    function toggleComplete(index) {
        // สลับค่า completed ของ To-Do ที่มีดัชนี index
        todos[index].completed = !todos[index].completed;
        // เรียกฟังก์ชัน renderTodoList() เพื่ออัปเดตการแสดงผล
        renderTodoList();
    }

    // ฟังก์ชันสำหรับแสดงรายการ To-Do บนหน้าเว็บ
    function renderTodoList() {
        // แสดงอาร์เรย์ของ To-Do ใน Console
        console.log(todos);
        // ล้างรายการ To-Do ที่มีอยู่แล้วใน HTML
        todoList.innerHTML = "";
        
        // วนลูปเพื่อสร้าง Element ใหม่สำหรับแต่ละ To-Do
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];
            const listItem = document.createElement("li");
            
            // กำหนดข้อความของ To-Do ใน Element li
            listItem.textContent = todoItem.text;
            
            // ถ้า To-Do ถูกทำเสร็จแล้ว ให้เพิ่ม class "completed"
            if (todoItem.completed) {
                listItem.classList.add("completed");
            }
            
            // สร้างปุ่ม "ลบ" และกำหนด Event Listener ให้เรียกฟังก์ชัน deleteTodo(i) เมื่อคลิก
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));
            
            // สร้างปุ่ม "เสร็จ/ยกเลิก" และกำหนด Event Listener ให้เรียกฟังก์ชัน toggleComplete(i) เมื่อคลิก
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));
            
            // เพิ่มปุ่มลงใน Element li
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);
            
            // เพิ่ม Element li ลงในรายการ To-Do
            todoList.appendChild(listItem);
        }
    }

    // กำหนด Event Listener สำหรับปุ่ม "เพิ่ม" เมื่อคลิก
    addButton.addEventListener("click", addTodo);
    
    // กำหนด Event Listener สำหรับการกด Enter ใน Input Element
    todoInput.addEventListener("keypress", function (event) {
        // ถ้าปุ่มที่ถูกกดคือ Enter
        if (event.key === "Enter") {
            // เรียกฟังก์ชัน addTodo()
            addTodo();
        }
    });

    // เรียกฟังก์ชัน renderTodoList() เพื่อแสดงรายการ To-Do ครั้งแรก
    renderTodoList();
});

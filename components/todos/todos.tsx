import { createClient } from "@/utils/supabase/server";
import Todo from "./todo";
import AddTodo from "./add-todo";

export default async function Todos() {
  const supabase = createClient();

  const { data: todos, error } = await supabase.from("todos").select("*");
  const { data: products } = await supabase.from("products").select("*");
  const { data: product_images } = await supabase.from("product_images").select("*");


  console.log('hello todos');
  console.log(product_images)

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col">
        {todos &&
          todos
            .filter((todo) => {
              return todo.is_complete == false;
            })
            .map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
        {todos &&
          todos
            .filter((todo) => {
              return todo.is_complete;
            })
            .map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
        <AddTodo />
      </div>
    </div>
  );
}

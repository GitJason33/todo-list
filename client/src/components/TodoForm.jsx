export default function TodoForm({ handleSubmit, btnLabel, state, setState, className }) {
  const handleStateChange = (e, stateKey) => {
    setState(prev => ({ ...prev, [stateKey]: e.target.value }))
  }

  return (
    <main className={`py-6 px-3 ${className}`}>
      <form 
        onSubmit={handleSubmit} 
        className="max-eye-view border border-prime my-rounding p-3 space-y-3"
      >
        <h2 className="text-center uppercase">{btnLabel}</h2>

        <section>
          <label htmlFor="todoTitle" className="acc-input-label">Title:</label>
          <input 
            id="todoTitle" 
            type="text" 
            required
            maxLength={200}
            className="acc-input"

            value={state.title}
            onChange={(e) => handleStateChange(e, "title")}
          />
        </section>


        <section>
          <label htmlFor="todoDate" className="acc-input-label">Due date:</label>
          <input 
            id="todoDate" 
            type="date" 
            className="acc-input"

            value={state.due_date}
            onChange={(e) => handleStateChange(e, "due_date")}
          />
        </section>


        <section>
          <label htmlFor="todoTime" className="acc-input-label">Due time:</label>
          <input 
            id="todoTime" 
            type="time" 
            className="acc-input"

            value={state.due_time}
            onChange={(e) => handleStateChange(e, "due_time")}
          />
        </section>

        
        <section>
          <label className="acc-input-label">Priority:</label>

          <div className="flex gap-3">
            <section className="flex gap-1.5">
              <input 
                id="lowPriority" 
                type="radio" 
                className="cursor-pointer"

                value="low"
                checked={state.priority === "low"}
                onChange={(e) => handleStateChange(e, "priority")}
              />
              <label htmlFor="lowPriority" className="text-low font-bold cursor-pointer">low</label>
            </section>

            <section className="flex gap-1.5">
              <input 
                id="mediumPriority" 
                type="radio" 
                className="cursor-pointer"

                value="medium"
                checked={state.priority === "medium"}
                onChange={(e) => handleStateChange(e, "priority")}
              />
              <label htmlFor="mediumPriority" className="text-medium font-bold cursor-pointer">medium</label>
            </section>
            
            <section className="flex gap-1.5">
              <input 
                id="highPriority" 
                type="radio"
                className="cursor-pointer"
                
                value="high"
                checked={state.priority === "high"}
                onChange={(e) => handleStateChange(e, "priority")}
              />
              <label htmlFor="highPriority" className="text-high font-bold cursor-pointer">high</label>
            </section>
          </div>
        </section>


        <section>
          <label htmlFor="todoDescription" className="acc-input-label">Description:</label>
          <textarea 
            id="todoDescription" 
            type="text" 
            maxLength={2000}
            rows={3}
            className="acc-input"

            value={state.description}
            onChange={(e) => handleStateChange(e, "description")}
          ></textarea>
        </section>


        <div className="flex justify-end">
          <button type="submit" className="btn btn-second">{btnLabel}</button>
        </div>
      </form>
    </main>
  )
}

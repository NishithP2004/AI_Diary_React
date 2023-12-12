import "./Form.css";

function Form(props) {
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      let form = document.forms[0];
      let formData = new FormData(form);

      await fetch(form.action, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: formData.get("message"),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Success!");
          props.setForm(props.form + 1);
          form.reset.click();
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred!");
        });
    } catch (err) {
      if (err) console.error(err);
    }
  };

  return (
    <form
      action={import.meta.env.VITE_BASE_URL + "/data"}
      method="POST"
      onSubmit={handleSubmit}
    >
      <label htmlFor="message">Enter a message...</label>
      <textarea
        required
        name="message"
        id="message"
        placeholder="I love coding"
      ></textarea>
      <div className="row">
        <button type="submit">Submit</button>
        <button type="reset" id="reset">
          Reset
        </button>
      </div>
    </form>
  );
}

export default Form;

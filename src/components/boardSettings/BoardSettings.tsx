import "./BoardSettings.css";

export function BoardSettings(props: any) {
  const { lenghX, lenghY, bombsQty, onChange } = props;

  let content: any = <div />;

  return (
    <>
      <div className={"BoardSettings-wrapper"}>
        X:
        <input
          value={lenghX}
          className={"BoardSettings-input"}
          type={"number"}
          onChange={(value) => {
            onChange({
              lenghY,
              bombsQty,
              lenghX: parseInt(value.currentTarget.value),
            });
          }}
        ></input>
        Y:
        <input
          value={lenghY}
          className={"BoardSettings-input"}
          type={"number"}
          onChange={(value) => {
            onChange({
              lenghX,
              bombsQty,
              lenghY: parseInt(value.currentTarget.value),
            });
          }}
        ></input>
        Bombs:
        <input
          value={bombsQty}
          className={"BoardSettings-input"}
          type={"number"}
          onChange={(value) => {
            onChange({
              lenghY,
              lenghX,
              bombsQty: parseInt(value.currentTarget.value),
            });
          }}
        ></input>
      </div>
      <button className={"BoardSettings-button"} onClick={props.onReset}>
        Reset
      </button>
    </>
  );
}

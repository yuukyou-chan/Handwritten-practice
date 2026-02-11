// 腾讯云二面
const InputNumber = ({ onChange, value }) => {
  const [value, setValue] = useState(value);

  const _onChange = (e) => {
    const val = e.target.value;
    if (Object.is(Number(val), NaN)) {
      setValue(val);
      onChange(val);
    }
  };

  return <input type="text" onChange={_onChange} value={value} />;
};

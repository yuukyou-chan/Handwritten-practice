// 腾讯云 一面 使用 react、TS和一个你熟悉的UI组件库 手写一个带请求功能的Select组件，
// 1. 支持多选
// 2. 支持请求搜索
// 3. 尽量考虑 鲁棒性 —— 系统在受到外部扰动或内部参数摄动等不确定性因素干扰时，系统扔保持其结构和功能稳定
import { Select, SelectProps } from "antd";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash-es";

interface AsyncSelectProps<T> extends SelectProps {
  fetcher: T;
  searchKey: string;
  debounceTime?: number;
}

const AsyncSelect = <T,>({
  fieldNames,
  fetcher,
  showSearch,
  debounceTime = 0,
  searchKey,
  ...restProps
}: AsyncSelectProps<T>) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = debounce(async (text) => {
    setLoading(true);
    const res = await fetcher({ [searchKey!]: text });
    setOptions(res.data);
  }, debounceTime);

  return (
    <Select
      {...restProps}
      showSearch={showSearch}
      onSearch={onSearch}
      loading={loading}
      options={options}
    >
      AsyncSelect
    </Select>
  );
};

export default AsyncSelect;

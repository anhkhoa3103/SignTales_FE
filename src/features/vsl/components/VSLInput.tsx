import { useState, type FormEvent } from 'react';

interface VSLInputProps {
  onSubmit: (sentence: string) => void;
  isLoading: boolean;
}

export function VSLInput({ onSubmit, isLoading }: VSLInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="vsl-input">
      <textarea
        className="vsl-input__textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập câu tiếng Việt... (vd: Tôi đi học hôm nay)"
        rows={3}
        disabled={isLoading}
        // Allow Shift+Enter for newline, Enter alone = submit
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
          }
        }}
      />
      <div className="vsl-input__footer">
        <span className="vsl-input__hint">
          Enter để dịch · Shift+Enter xuống dòng
        </span>
        <button
          type="submit"
          className="vsl-input__btn"
          disabled={isLoading || !value.trim()}
        >
          {isLoading ? 'Đang xử lý...' : 'Chuyển đổi VSL'}
        </button>
      </div>
    </form>
  );
}
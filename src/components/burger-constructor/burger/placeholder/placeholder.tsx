import styles from './placeholder.module.css';

const Placeholder = ({
  text,
  type,
  textStyle,
}: {
  text?: string;
  type?: string;
  textStyle?: boolean;
}): JSX.Element => {
  return (
    <div
      className={`${styles.container} ${type === 'top' && styles.top} ${
        type === 'bottom' && styles.bottom
      }`}>
      <span
        className={`text text_type_main-medium ${textStyle && styles.text}`}>
        {text}
      </span>
    </div>
  );
};

export default Placeholder;

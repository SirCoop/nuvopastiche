import { openSnackbar } from './CustomizedSnackbars';

export default function notify({ message = '', variant = '', duration = 3000 }) {
  openSnackbar({ message, variant, duration });
}

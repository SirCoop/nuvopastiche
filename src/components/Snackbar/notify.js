import { openSnackbar } from './CustomizedSnackbars';

export default function notify({ message = '', variant = '', duration = 4000 }) {
  openSnackbar({ message, variant, duration });
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DialogCom = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are Not sign in yet !</AlertDialogTitle>
          <AlertDialogDescription>
            Access Your Watchlist: Start tracking your favorite cryptocurrencies
            by signing in or creating an account. Dont miss out on real-time
            updates and personalized insights!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href="/signin">
            <AlertDialogAction>Sign-In</AlertDialogAction>
          </Link>

          <Link href="/register">
            <AlertDialogAction>Create Account</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogCom;

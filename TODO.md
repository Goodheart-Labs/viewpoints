- [x] Find out why a polls/xxx page is not working
- [x] Custom 404 Page
- [ ] Privacy
  - [x] Add a column for this in the database
  - [x] Add a toggle for this on the poll creation page
  - [x] Make sure the user can edit it after the fact on the poll edit page
  - [x] There's no link to the results page (unless you are poll creator_)
  - [x] You can't access the results page even by url (says results are private, 404 doesn't make sense to do)
  - [x] Also need to remove the "Copy link to results page" from share dropdown if results private
  - [x] Remove download CSV unless it's the poll creator
  - [x] At the end of the poll it just "Thanks for filling this out!"
  - [x] Check with "Create with AI" should be able to mark results as private
  - [x] Show on the polls list if the results are private
  - [x] API endpoints
  - [ ] Run on staging DB before pushing pull request
  - [ ] Then Prod


- [ ] I just signed up and it doesn't know that I have a pro plan. This should be fixed instantly, maybe through route revalidation on the success page or something.
- [ ] The ability to delete a poll!

private routes

/new-poll
/success
/upgrade
/user/*

- [ ] Make Sign In Page More Inviting
- [ ] The Create a Poll straight to payment page is defintely not going to work. You have to invite people in
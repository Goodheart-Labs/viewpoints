export function BackToSouthGlos() {
  return (
    <div className="w-full bg-white rounded-md shadow-md dark:bg-transparent dark:border dark:border-neutral-700 text-neutral-900 dark:text-white mb-4">
      <div className="grid gap-4 p-5">
        <p className="text-lg leading-6">
          Thank you for participating in this project. For more information
          about the council plan, and to participate in the current full public
          consultation, please visit our consultation page here:
          <br />
          <a
            href="https://sgcouncilplan.commonplace.is/"
            className="text-orange-500 hover:underline"
          >
            Have Your Say Today - South Gloucestershire Council Plan 2024-2028 -
            Commonplace
          </a>
        </p>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Any personal information that you have supplied will be held by South
          Gloucestershire Council in accordance with the Data Protection Act
          2018 and UK General Data Protection Regulations (UKGDPR) 2021. This
          information will only be used as part of this exercise and personal
          information will not be published or passed onto any other
          organisation. Your personal information collected as part of this
          survey will be kept for two years to help us improve services before
          being securely destroyed.
        </p>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Our privacy notice, which explains how we will process your personal
          information, how long we will retain it and your rights as a data
          subject, is available at{" "}
          <a
            href="https://www.southglos.gov.uk/privacy"
            className="text-orange-500 hover:underline"
          >
            www.southglos.gov.uk/privacy
          </a>
        </p>
      </div>
    </div>
  );
}

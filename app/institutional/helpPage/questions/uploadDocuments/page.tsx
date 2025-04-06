import UploadDocuments from '@library/_institutional/sections/helpPage/sections/registration/uploadDocuments'
import MoreDoubts from '@library/_institutional/sections/helpPage/sections/registration/moreDoubts'

export default function page() {
  return (
    <>
      <UploadDocuments />
      <div className="only-desktop">
        <MoreDoubts />
      </div>
    </>
  )
}

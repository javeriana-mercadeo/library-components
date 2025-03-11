import ViewComponent from '@components/viewCode/viewComponent'
import MeetingDirector from '@/library/pregrado/sections/meetingDirector'
import BlogHeader from '@library/_institutional/sections/blogHeader'
import BlogFeatured from '@library/_institutional/sections/blogFeatured'

export default function Blogs() {
  return (
    <>
      <ViewComponent path="pregrado/sections/meetingDirector">
        <MeetingDirector />
      </ViewComponent>

      <ViewComponent path="_institutional/sections/blogHeader">
        <BlogHeader />
      </ViewComponent>

      <ViewComponent path="_institutional/sections/blogFeatured">
        <BlogFeatured />
      </ViewComponent>

      <div className="component-card text-break">
        <div className="card m-0 overflow-hidden">
          <img
            alt=""
            className="${configuration.imageSize}"
            data-lfr-editable-id="01-img"
            data-lfr-editable-type="image"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAkSURBVHgB7cxBEQAACAIwtH8Pzw52kxD8OBZgNXsPQUOUwCIgAz0DHTyygaAAAAAASUVORK5CYII="
          />

          <div className="card-body py-4">
            <h2>
              <span className="clearfix" data-lfr-editable-id="02-title" data-lfr-editable-type="rich-text">
                Card Title example
              </span>
            </h2>

            <div className="clearfix mb-4" data-lfr-editable-id="03-content" data-lfr-editable-type="rich-text">
              <p>
                This is an example of quick text to fill the body of the card with some content in order to present it properly in page. We
                hope you like it.
              </p>
            </div>

            <a
              className="link"
              data-lfr-editable-id="04-link"
              data-lfr-editable-type="link"
              href=""
              id="fragment-${fragmentEntryLinkNamespace}-04-link">
              Go Somewhere
            </a>
          </div>
        </div>
      </div>

      <div className="block rounded-lg p-4 shadow-xs shadow-indigo-100 max-w-sm">
        <img
          alt=""
          className="${configuration.imageSize} h-56 w-full rounded-md object-cover"
          data-lfr-editable-id="01-img"
          data-lfr-editable-type="image"
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        />

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Categoría</dt>

              <dd className="text-sm text-gray-500" data-lfr-editable-id="0-category" data-lfr-editable-type="rich-text">
                Category
              </dd>
            </div>

            <div>
              <dt className="sr-only">Nombre</dt>

              <dd className="font-medium" data-lfr-editable-id="02-title" data-lfr-editable-type="rich-text">
                123 Wallaby Avenue, Park Road
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Parking</p>

                <p className="font-medium">2 spaces</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Bathroom</p>

                <p className="font-medium">2 rooms</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <div className="mt-1.5 sm:mt-0">
                <p className="text-gray-500">Bedroom</p>

                <p className="font-medium">4 rooms</p>
              </div>
            </div>
          </div>

          <p className="pt-5" data-lfr-editable-id="03-content" data-lfr-editable-type="rich-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia repellendus iure nam porro numquam. Nihil obcaecati tempore
            nobis aut voluptatibus perferendis.
          </p>

          <a
            className="pt-2"
            data-lfr-editable-id="04-link"
            data-lfr-editable-type="link"
            href=""
            id="fragment-${fragmentEntryLinkNamespace}-04-link">
            Ver más
          </a>
        </div>
      </div>
    </>
  )
}

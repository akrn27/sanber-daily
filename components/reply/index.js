import React, { useEffect } from 'react'
import { Button, Label, Textarea } from 'flowbite-react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const Reply = () => {
    const router = useRouter();
    const {id} = router.query;

    const getReplies = async () => {
        try {
            const token = Cookies.get("user_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios.get(`https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`, config);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getReplies()
    }, [])

    const addReply = async (e) => {

    }

  return (
    <div>
        <form onSubmit={addReply} className="flex w-full flex-col gap-4">
        <div className="max-w-md" id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Replies Post" />
          </div>
          <Textarea
            id="comment"
            placeholder="reply post..."
            required
            rows={4}
            value=''
            onChange=''
          />
        </div>
        <Button type="submit" color="info">
          Reply
        </Button>
      </form>
    </div>
  )
}

export default Reply
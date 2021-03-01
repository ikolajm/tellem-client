import moment from "moment"
import { IoIosTrash } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";

export default (user, incomingMessage, conversation, messageHistory) => {
    let author = conversation.users.findIndex(user => user.id === incomingMessage.userId);
    // Date seperator
    let dateSeperator = document.createElement("div")
    dateSeperator.className = "date-seperator"
        // Line
        let line = document.createElement("div")
        line.classList = "line"
        // Date
        let messageSetDate = document.createElement("span")
        messageSetDate.innerText = moment(incomingMessage.createdAt).format("L")
    dateSeperator.appendChild(line)
    dateSeperator.appendChild(messageSetDate)
    // Append message item to the bottom of most recent data set
    let newMessage = document.createElement("div")
    newMessage.id = incomingMessage.uuid
    newMessage.className = "message-item"
        // Avatar
        let nmAvatar = document.createElement("div")
        nmAvatar.className = "avatar"
        nmAvatar.style.background = conversation.users[author].background
            let avatarSpan = document.createElement("span")
            avatarSpan.innerText = conversation.users[author].username.substring(0, 1)
        nmAvatar.appendChild(avatarSpan)
        // Info
        let info = document.createElement("div")
        info.className = "meta-container"
            // Username
            let strong = document.createElement("strong")
                let username = document.createElement("span")
                username.innerText = conversation.users[author].username
            strong.appendChild(username)
            // Sent date
            let sentDate = document.createElement("span")
                sentDate.className="date"
                sentDate.innerText = moment(incomingMessage.createdAt).format("LT")
            // Message
            let messageContent = document.createElement("p")
            messageContent.innerText = incomingMessage.content
            info.appendChild(strong)
            info.appendChild(sentDate)
            info.appendChild(messageContent)
    newMessage.appendChild(nmAvatar)
    newMessage.appendChild(info)
    messageHistory.appendChild(dateSeperator)
    let groupContent = document.createElement("div")
    groupContent.className = "message-group-content"
    groupContent.appendChild(newMessage)
    messageHistory.appendChild(groupContent)
}
